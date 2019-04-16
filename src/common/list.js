import XLSX from 'xlsx'
import FileSaver from 'file-saver';
var list = function (option) {
  this.computed = {
    data: function () {
      return option.store.data(this.filterLocal)
    },
    total: option.store.total,
  };
  this.methods = {
    resetFilter() {
      for (var key in this.filters) {
        this.filters[key] = ""
      }
    },
    changePage(val) {
      this.pagination.page = val;
      this.pagination.start= (val-1)* this.pagination.size
      this.getList();
    },
    getList(callback) {
      //检测开始日期不能大于截止日期
      var time
      if(this.filters && this.filters.etime && this.filters.stime ){
        time = new Date(this.filters.etime).getTime() - new Date(this.filters.stime).getTime()
      }

      if(this.filters.g_end_time && this.filters.g_begin_time ){
        time = new Date(this.filters.g_end_time).getTime() - new Date(this.filters.g_begin_time).getTime()
      }

      if(time < 0){
        this.$alert('开始日期不能大于截止日期', '温馨提示', {
          confirmButtonText: '确定',
          center: true
        })
        return
      }

      var params = {};
      for (var key in this.pagination) {
        params[key] = this.pagination[key]
      }
      for (var key in this.filters) {
        if(!this.excludeFilters || (this.excludeFilters && this.excludeFilters.indexOf(key)==-1))
          params[key] = this.filters[key]
      }
      this.loading = true;
      option.store.load(params, () => {
        this.loading = false
        if(typeof callback == "function")
          callback()
      }, () => {
        this.loading = false
        if(typeof callback == "function")
          callback()
      })
    },
    add() {
      this.$router.push({name: this.routeName, params: {id: "new"}})
    },
    view(index, row) {
      this.$router.push({name: this.routeName, params: {id: row[option.store.idName]}})
    },
    remove(index, row) {
      this.$swal({
        title: '提示',
        text: '此操作将删除该记录, 是否继续?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.value) {
          var params = {};
          params[option.store.idName] = row[option.store.idName];
          this.loading = true;
          option.store.delete(params, (data) => {
            this.loading = false;
            //this.back();
          }, () => {
            this.loading = false
          })
        }
      })
    },
    excel(val) {
      var url = option.store.option.server.load.url
      var data = [];
      if(val){
        this.exportsExcel(val)
      }else{
        this.exportLoading = true
        let params = _.clone(this.filters);
        params.page = 1
        params.size = 50000
        params.list = 50000
        this.$http.post(url, params)
        .then((response) => {
          this.exportLoading = false
          data = response.data.data.list
          this.exportsExcel(data)
        })
        .catch((response) => {
          this.exportLoading = false
          this.$confirm("导出失败！", '提示', {
            type: 'warning',
          })
        })
      }
    },

    exportsExcel(data){
      var excelName = this.sheetName;
      var sheetTitle = this.sheetTitle;
      data = this.formatDatas? this.formatDatas(data):data
      if(data.length<1){
        this.$confirm("没有可导出的数据！", '提示', {
          type: 'warning',
        })
        return;
      }
      for (let i in data) {
        let item = {}
        for(let key in sheetTitle){
          item[key] = data[i][key];
        }
        let newdata = _.mapKeys(item, function (value, key) {
          return sheetTitle[key];
        });
        data[i] = newdata;
      }
      let wb = {SheetNames: ['Sheet1'], Sheets: {}, Props: {}};
      const ws = XLSX.utils.json_to_sheet(data);
      wb.Sheets['Sheet1'] = ws;
      /* get binary string as output */
      const wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
      try {
        FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), excelName);
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },

    formatOtherDate(value,type){
      if(value) {//判断对应的属性是否存在
        return this.formatDate(value,type)
      }
    },
    formatTableDate(row, column){
      if(row[column.property]) {//判断对应的属性是否存在
        return this.formatDate(row[column.property])
      }
    },
    formatTableNumber(row, column){
      if(row[column.property]) {//判断对应的属性是否存在
        return this.formatNumber(row[column.property])
      }
    },
    formatYMD(ymd) {
      return ymd<10?('0'+ymd):ymd;
    },

    formatDate(time,type) {
      var dt = new Date(time)
      var month=this.formatYMD(dt.getMonth()+1)
      var day=this.formatYMD(dt.getDate())
      var hh=this.formatYMD(dt.getHours())
      var mm=this.formatYMD(dt.getMinutes())
      var ss=this.formatYMD(dt.getSeconds())
      switch (type) {
        case 1:
          return time=dt.getFullYear();
        case 2:
          return time=dt.getFullYear()+'-'+month;
        case 3:
          return time=dt.getFullYear()+'-'+month+'-'+day;
        default:
          return time=dt.getFullYear()+'-'+month+'-'+day+" " +hh+":"+ mm+":"+ ss;
      }
    },
    //格式化数字，保留两位小数
    formatNumber (number) {
      var value = Math.round(parseFloat(number) * 100) / 100;
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + '.00';
        return number = value
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + '0';
        }
        return  value
      }
    },
    initButton(parent,child){
      let privates = this.$store.getters['navList/data'];
      let list = [];
      for(let item of privates){
        if(parent == item.id){
          for(let citem of item.children){
            if(child == citem.id){
              list =  citem.children;
              break;
            }
          }
        }
      }
      for(var item of list){
        this.buttonList[item.name] = true
      }
    }
  }
}
export default list
