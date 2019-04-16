<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/infoManage' }">CP管理</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first">
        <router-link :to="{ path: '/gameManage' }">游戏管理</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">当前游戏：{{$route.params.gName || model.gName}}</span>
    </div>
    <!--用户基本信息表单-->
    <el-card class="box-card changeMar MyContainerCon">
      <div  v-loading="loading">
        <div style="margin:6px 0 "></div>
        <div class="headDiv">
          <el-row :gutter="10" type="flex" class="row-bg" justify="center">
            <el-col :span="24">
              <div style="color: #409EFF;text-align: center;">
                <span style="font: 18px large;">游戏状态：</span>
                <p :class="setTitlesCls" style="display: inline-block;">
                  <i :class="setTitlesIcon"></i>{{setTitles}}
                </p>
                <el-button class="status" v-if="buttonList.lever && status=='0' && (!grade || grade=='0')" size="mini"
                           type="warning" @click="lever()">
                  <i class="fa fa-balance-scale"></i>评级
                </el-button>
                <el-button class="status" v-if="buttonList.audit && status=='0' && (grade && grade!='0')" size="mini"
                           type="warning" @click="audit()">
                  <i class="el-icon-edit-outline"></i>审核
                </el-button>
                <el-button class="status" v-if="buttonList.test && status=='2' && offstatus=='1'" size="mini"
                           type="warning" @click="test()" :disabled="teststatus=='0'">
                  <i class="el-icon-edit-outline"></i>测试
                </el-button>
                <el-button class="status" v-if="buttonList.doit && status=='4' && offstatus=='1'" size="mini"
                           type="danger" @click="doIt()">
                  <i class="fa fa-comments-o"></i>商用
                </el-button>
                <el-button class="status" v-if="buttonList.offline && status=='5' && offstatus=='1'" size="mini"
                           type="warning" @click="offLine()">
                  <i class="fa fa-times"></i>下线
                </el-button>
                <el-button class="status" v-if="buttonList.online && offstatus=='0'" size="mini" type="success"
                           @click="goLine()">
                  <i class="el-icon-upload"></i>上线
                </el-button>
                <el-button class="status" v-if="buttonList.auditOffline && status=='6' && offstatus=='1'" size="mini"
                           type="info" @click="auditOffLine()">
                  <i class="el-icon-edit-outline"></i>下线审核
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="margin:6px 0 "></div>
        <el-collapse v-model="activeNames" style="border-top: none">
          <div style="margin:6px 0 "></div>
          <!-- 基本信息 -->
          <el-form ref="form" :model="model" :rules="rules" label-width="200px">
            <el-collapse-item name="1">
              <template slot="title">
                <span><i class="fa fa-list-alt"></i>基本信息</span>
              </template>
              <el-row :gutter="10">
                <el-col :xs="23" :sm="{span: 24}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="游戏名称" prop="gName" :class="{'marBot':disabled}">
                    <el-input placeholder="游戏名称请与安装包内游戏名称一致" v-model.trim="model.gName" :clearable="!disabled"
                              :disabled="disabled"></el-input>
                  </el-form-item>
                  <el-form-item label="副标题" prop="subhead" :class="{'marBot':disabled}">
                    <el-input placeholder="请输入一句话简介" v-model.trim="model.subhead" :clearable="!disabled"
                              :disabled="disabled"></el-input>
                  </el-form-item>
                  <el-form-item label="关键词(选填)" :class="{'marBot':disabled}">
                    <span style="padding-top:4px;color: #909399;" v-if='disabled'
                       v-text='model.gamelabel'></span>
                    <el-input placeholder="请输入搜索关键词" v-model.trim="model.gamelabel" :clearable="!disabled"
                              :disabled="disabled" type="textarea" :rows="2" v-if='!disabled'></el-input>
                  </el-form-item>
                 <!-- <el-form-item label="游戏私钥"  :class="{'marBot':disabled}">
                    <a :href="model.privateKey" v-if="model.privateKey" style="padding: 0 15px">点击下载</a>
                    <span v-else="!model.privateKey" class="spanColor">私钥还未生成</span>
                  </el-form-item>-->
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="游戏类型" prop="Type" :class="{'marBot':disabled}">
                        <el-select v-model="model.Type" placeholder="请选择" style="width: 100%" :clearable="!disabled"
                                   :disabled="disabled" :class="{ 'notSel': disabled }">
                          <el-option label="单机" value="0"></el-option>
                          <el-option label="网游" value="1"></el-option>
                          <el-option label="H5" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="游戏分类" prop="Sort" :class="{'marBot':disabled}">
                        <el-select v-model="model.Sort" placeholder="请选择" style="width: 100%" :clearable="!disabled"
                                   :disabled="disabled" :class="{'notSel': disabled }">
                          <el-option
                            v-for="item in gameSort"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="游戏标签" prop="typetag" :class="{'marBot':disabled}">
                    <span v-if="disabled" style="color:#909399 ">{{model.typetag}}</span>
                  </el-form-item>
                  <el-form-item label="是否付费" prop="ispaymoney" :class="{'marBot':disabled}">
                    <el-select v-model="model.ispaymoney" placeholder="请选择" style="width: 100%"  :clearable="!disabled"
                               :disabled="disabled" :class="{ 'notSel': disabled }">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="游戏介绍" prop="Introduc" :class="{'marBot':disabled}">
                    <span style="padding-top:4px;color: #909399;" v-if='disabled'
                       v-text='model.Introduc'></span>
                    <el-input v-if="!disabled"
                              type="textarea"
                              :rows="7"
                              placeholder="请输入游戏简介（500字以内）"
                              v-model.trim="model.Introduc" :disabled="disabled"
                              :maxlength="500">
                    </el-input>
                  </el-form-item>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="测试服IP地址" prop="testserverip">
                        <el-input placeholder="测试服IP地址" v-model.trim="model.testserverip" :clearable="!disabled"
                                  :disabled="disabled"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="正式服IP地址" prop="officialserverip">
                        <el-input placeholder="正式服IP地址" v-model.trim="model.officialserverip" :clearable="!disabled"
                                  :disabled="disabled"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item>
                    <span class="spanStyle" v-if="!disabled">*如有多个地址请以英文逗号隔开</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <!-- 版权信息 -->
            <el-collapse-item name="2">
              <template slot="title">
                <span><i class="fa fa-copyright"></i>版权信息</span>
              </template>
              <div style="color: #F56C6C;text-indent: 24px;" v-if="!disabled">
                注：所有授权文件需原件彩色扫描上传或者复印件加盖公司章彩色扫描上传（不接受拍照图片）。
                所有授权文件支持 jpg/png/zip/rar格式，大小限制为5MB以内。
              </div>
              <el-row :gutter="10">
                <el-col :xs="23" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-card class="box-card elCardPad removeBorder">
                    <el-form-item label="版权授权书" class="Copyright" prop="Copyright" :class="{'marBot':disabled}">
                      <el-upload class="upload-demo"
                                 action=""
                                 :limit="1"
                                 :on-exceed="handleExceed"
                                 :on-change='uploadCopyright'
                                 :auto-upload="false">
                        <div :class="disabled?'delImg':''">
                          <el-button type="primary" icon="fa fa-upload" plain :class="disabled?'delImg':''"
                                     v-if="!disabled">本地上传
                          </el-button>
                        </div>
                      </el-upload>
                      <el-button type="primary" style="margin-top: 8px;" icon="fa fa-download" plain v-if="!disabled"
                                 @click="downloda()">
                        版权授权书模板下载
                      </el-button>
                      <div v-if="model.Copyright && isOk" style="margin-bottom: 10px">
                        <div v-if="!(model.Copyright.toString().split('.')[model.Copyright.toString().split('.').length-1]=='pdf')">
                          <img :src="model.Copyright" alt="" class="imgStyle" style="margin: 10px 0;"
                               @click="clickImg($event)">
                        </div>
                        <div v-if="(model.Copyright.toString().split('.')[model.Copyright.toString().split('.').length-1]=='pdf')" @click="clickImg($refs.myCopyright)">
                          <pdf ref='myCopyright' :src="model.Copyright" style="margin: 10px 0;display: block; width: 250px;height: 150px" class="pdfstyle"></pdf>
                        </div>
                        <el-button type="danger" icon="el-icon-delete" plain @click="model.Copyright=''"
                                   v-if="!disabled" :class="disabled?'delImg':''">删除图片
                        </el-button>
                      </div>
                    </el-form-item>
                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
                        <el-form-item label="版权有效期" prop="CsTime" :class="{'marBot':disabled}">
                          <p style="padding-top:10px;padding-left:15px;color: #909399;" v-if="disabled">
                            <span v-text="formatOtherDate(model.CsTime,3)"></span>&nbsp;&nbsp;&nbsp;To&nbsp;&nbsp;&nbsp;
                            <span v-text="formatOtherDate(model.CeTime,3)"></span>
                          </p>
                          <el-col :span="7" v-if="!disabled">
                            <div class="block">
                              <el-date-picker type="date"
                                              :disabled="disabled"
                                              placeholder="开始日期"
                                              v-model="model.CsTime"
                                              style="width: 100%;"
                                              :editable="false"
                                              format="yyyy-MM-dd"
                                              value-format="yyyy-MM-dd">
                              </el-date-picker>
                            </div>
                          </el-col>
                          <el-col :span="7" v-if="!disabled">
                            <el-form-item prop="CeTime">
                              <div class="block">
                                <el-date-picker type="date"
                                                :disabled="disabled"
                                                placeholder="结束日期"
                                                v-model="model.CeTime"
                                                style="width: 100%;"
                                                :editable="false"
                                                format="yyyy-MM-dd"
                                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                              </div>
                            </el-form-item>
                          </el-col>
                        </el-form-item>
                        <el-form-item v-if="!disabled">
                          <p class="spanStyle" style="display: block;">*该游戏在本平台的版权有效时间</p>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                  <hr>
                  <el-card class="box-card elCardPad removeBorder">
                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                        <el-form-item label="游戏版权" prop="GameCopy" :class="{'marBot':disabled}">
                          <el-radio v-model="model.GameCopy" label="0" :disabled="disabled">自研
                          </el-radio>
                          <el-radio v-model="model.GameCopy" label="1" :disabled="disabled">代理</el-radio>
                        </el-form-item>
                        <div v-if="model.GameCopy=='1'">
                          <el-form-item label="代理授权文件" class="CopyFile" prop="CopyFile">
                            <el-upload class="upload-demo"
                                       action=""
                                       :limit="1"
                                       :on-exceed="handleExceed"
                                       :auto-upload='false'
                                       :on-change='uploadCopyFile'>
                              <el-button type="primary" icon="fa fa-upload" v-if="!disabled" plain
                                         :class="disabled?'delImg':''">本地上传
                              </el-button>
                            </el-upload>
                            <div v-if="model.CopyFile && isOk">
                              <div v-if="!(model.CopyFile.toString().split('.')[model.CopyFile.toString().split('.').length-1]=='pdf')">
                                <img :src="model.CopyFile" alt="" class="imgStyle" style="margin: 10px 0;"
                                     @click="clickImg($event)">
                              </div>
                              <div v-if="(model.CopyFile.toString().split('.')[model.CopyFile.toString().split('.').length-1]=='pdf')" @click="clickImg($refs.myCopyFile)">
                                <pdf ref='myCopyFile' :src="model.CopyFile" style="margin: 10px 0;display: block; width: 250px;height: 150px" class="pdfstyle"></pdf>
                              </div>
                              <el-button type="danger" icon="el-icon-delete" plain @click="model.CopyFile=''"
                                         v-if="!disabled" :class="disabled?'delImg':''">删除图片
                              </el-button>
                            </div>
                          </el-form-item>
                          <el-form-item>
                            <span class="spanStyle" v-if="!disabled"> *请保证IP授权链完整，若游戏涉及商标证明文件，请一并提供</span>
                          </el-form-item>
                        </div>
                       <!-- <el-row v-if="model.GameCopy=='0'">-->
                          <el-form-item label="软件著作权登记证书" class="Zzdjs" prop="Zzdjs" :class="{'marBot':disabled}">
                            <el-upload class="upload-demo"
                                       action=""
                                       :limit="1"
                                       :on-exceed="handleExceed"
                                       :auto-upload='false'
                                       :on-change='uploadZzdjs'>
                              <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                         :class="disabled?'delImg':''">本地上传
                              </el-button>
                            </el-upload>
                            <div v-if="model.Zzdjs && isOk" style="margin-bottom: 14px;">
                              <div v-if="!(model.Zzdjs.toString().split('.')[model.Zzdjs.toString().split('.').length-1]=='pdf')">
                                <img :src="model.Zzdjs" alt="" class="imgStyle" style="margin: 10px 0;"
                                     @click="clickImg($event)">
                              </div>
                              <div v-if="(model.Zzdjs.toString().split('.')[model.Zzdjs.toString().split('.').length-1]=='pdf')" @click="clickImg($refs.myZzdjs)">
                                <pdf ref='myZzdjs' :src="model.Zzdjs" style="margin: 10px 0;display: block; width: 250px;height: 150px" class="pdfstyle"></pdf>
                              </div>
                              <el-button type="danger" icon="el-icon-delete" plain @click="model.Zzdjs=''"
                                         v-if="!disabled" :class="disabled?'delImg':''">删除图片
                              </el-button>
                            </div>
                          </el-form-item>
                          <el-form-item label="软著登记证编号" prop="Znumber" :class="{'marBot':disabled}">
                            <el-input placeholder="请输入软著登记证编号" v-model.trim="model.Znumber" :clearable="!disabled"
                                      :disabled="disabled"></el-input>
                          </el-form-item>
                          <el-form-item label="著作权人名称" prop="ZName" :class="{'marBot':disabled}">
                            <el-input placeholder="请输入著作权人名称" v-model.trim="model.ZName" :clearable="!disabled"
                                      :disabled="disabled"></el-input>
                          </el-form-item>
                        <!--</el-row>-->
                      </el-col>
                      <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                        <el-form-item label="ip授权" prop="IpHave" :class="{'marBot':disabled}">
                          <el-radio v-model="model.IpHave" label='0' :disabled="disabled">无
                          </el-radio>
                          <el-radio v-model="model.IpHave" label='1' :disabled="disabled">有
                          </el-radio>
                        </el-form-item>
                        <div v-if="model.IpHave=='1'">
                          <el-form-item label="ip授权链文件" class="Ipis" prop="Ipis">
                            <el-upload class="upload-demo"
                                       action=""
                                       :limit="1"
                                       :on-exceed="handleExceed"
                                       :auto-upload='false'
                                       :on-change='uploadIpis'>
                              <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                         :class="disabled?'delImg':''">本地上传
                              </el-button>
                            </el-upload>
                            <div v-if="model.Ipis && isOk">
                              <div v-if="!(model.Ipis.toString().split('.')[model.Ipis.toString().split('.').length-1]=='pdf')">
                                <img :src="model.Ipis" alt="" class="imgStyle" style="margin: 10px 0;"
                                     @click="clickImg($event)">
                              </div>
                              <div v-if="(model.Ipis.toString().split('.')[model.Ipis.toString().split('.').length-1]=='pdf')" @click="clickImg($refs.myIpis)">
                                <pdf ref='myIpis' :src="model.Ipis" style="margin: 10px 0;display: block; width: 250px;height: 150px" class="pdfstyle"></pdf>
                              </div>
                              <el-button type="danger" icon="el-icon-delete" plain @click="model.Ipis=''"
                                         :class="disabled?'delImg':''" v-if="!disabled">
                                删除图片
                              </el-button>
                            </div>
                          </el-form-item>
                          <el-form-item>
                            <span class="spanStyle" v-if="!disabled"> *请保证IP授权链完整，若游戏涉及商标证明文件，请一并提供</span>
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>
                  </el-card>
                  <hr>
                  <div v-show="model.ispaymoney==1">
                  <el-form-item label="出版物号（ISBN）核发单" class="ISBN" prop="ISBN" :class="{'marBot':disabled}">
                    <el-upload class="upload-demo"
                               action=""
                               :limit="1"
                               :on-exceed="handleExceed"
                               :auto-upload='false'
                               :on-change='uploadISBN'>
                      <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                 :class="disabled?'delImg':''">本地上传
                      </el-button>
                    </el-upload>
                    <div v-if="model.ISBN " style="margin-bottom: 14px;">
                      <div v-if="!(model.ISBN.toString().split('.')[model.ISBN.toString().split('.').length-1]=='pdf')">
                        <img :src="model.ISBN" alt="" class="imgStyle" style="margin: 10px 0;"
                             @click="clickImg($event)">
                      </div>
                      <div v-if="(model.ISBN.toString().split('.')[model.ISBN.toString().split('.').length-1]=='pdf')" @click="clickImg($refs.myISBN)">
                        <pdf ref='myISBN' :src="model.ISBN" style="margin: 10px 0;display: block; width: 250px;height: 150px" class="pdfstyle"></pdf>
                      </div>
                      <el-button type="danger" icon="el-icon-delete" plain @click="model.ISBN=''"
                                 :class="disabled?'delImg':''" v-if="!disabled">删除图片
                      </el-button>
                    </div>
                  </el-form-item>
                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                        <el-form-item label="出版物号" prop="ISBNNum" :class="{'marBot':disabled}">
                          <el-input placeholder="请输入出版物号" v-model.trim="model.ISBNNum" :clearable="!disabled"
                                    :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item :class="{'marBot':disabled}">
                            <span class="spanStyle"
                                  v-if="!disabled">*示例：“ISBN 888-8-8888-8888-8”</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                        <el-form-item label="出版服务单位全称" prop="BatchName" :class="{'marBot':disabled}">
                          <el-input placeholder="请输入出版服务单位全称" v-model.trim="model.BatchName" :clearable="!disabled"
                                    :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item :class="{'marBot':disabled}">
                          <span class="spanStyle" v-if="!disabled">*示例：“三辰影库音像出版社”</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  <hr>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="文化部备案文件(选填)" class="PutFile" prop="PutFile">
                        <el-upload class="upload-demo"
                                   action=""
                                   :limit="1"
                                   :on-exceed="handleExceed"
                                   :auto-upload='false'
                                   :on-change='uploadPutFile' :class="{'marBot':disabled}">
                          <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                     :class="disabled?'delImg':''">本地上传
                          </el-button>
                        </el-upload>
                        <div v-if="model.PutFile && isOk" style="margin-bottom: 14px;">
                          <div v-if="!(model.PutFile.toString().split('.')[model.PutFile.toString().split('.').length-1]=='pdf')">
                            <img :src="model.PutFile" alt="" class="imgStyle" style="margin: 10px 0;"
                                 @click="clickImg($event)">
                          </div>
                          <div v-if="(model.PutFile.toString().split('.')[model.PutFile.toString().split('.').length-1]=='pdf')" @click="clickImg($refs.myPutFile)">
                            <pdf ref='myPutFile' :src="model.PutFile" style="margin: 10px 0;display: block; width: 250px;height: 150px" class="pdfstyle"></pdf>
                          </div>
                          <el-button type="danger" icon="el-icon-delete" plain @click="model.PutFile=''"
                                     :class="disabled?'delImg':''" v-if="!disabled">删除图片
                          </el-button>
                        </div>
                      </el-form-item>
                      <el-form-item :class="{'marBot':disabled}">
                        <span class="spanStyle" v-if="!disabled"> *国产游戏：需上线30日内提供备案电子标签截图</span>
                        <span class="spanStyle" v-if="!disabled">*进口游戏：需上线前提供备案电子标签截图</span>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="文化部备案号(选填)" prop="PutRecords" :class="{'marBot':disabled}">
                        <el-input placeholder="请输入文化部备案号" v-model.trim="model.PutRecords" :clearable="!disabled"
                                  :disabled="disabled"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <hr>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="广电总局出版出版批复文件" class="ApproveFile" prop="ApproveFile" :class="{'marBot':disabled}">
                        <el-upload class="upload-demo"
                                   action=""
                                   :limit="1"
                                   :on-exceed="handleExceed"
                                   :auto-upload='false'
                                   :on-change='uploadApproveFile'>
                          <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                     :class="disabled?'delImg':''">本地上传
                          </el-button>
                        </el-upload>
                        <div v-if="model.ApproveFile && isOk" style="margin-bottom: 14px;">
                          <div v-if="!(model.ApproveFile.toString().split('.')[model.ApproveFile.toString().split('.').length-1]=='pdf')">
                            <img :src="model.ApproveFile" alt="" class="imgStyle" style="margin: 10px 0;"
                                 @click="clickImg($event)">
                          </div>
                          <div v-if="(model.ApproveFile.toString().split('.')[model.ApproveFile.toString().split('.').length-1]=='pdf')" @click="clickImg($refs.myApproveFile)">
                            <pdf ref='myApproveFile' :src="model.ApproveFile" style="margin: 10px 0;display: block; width: 250px;height: 150px" class="pdfstyle"></pdf>
                          </div>
                          <el-button type="danger" icon="el-icon-delete" plain @click="model.ApproveFile=''"
                                     :class="disabled?'delImg':''"
                                     v-if="!disabled">删除图片
                          </el-button>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="广电总局批文号" prop="BatchNum" :class="{'marBot':disabled}">
                        <el-input placeholder="请输入广电总局批文号" v-model.trim="model.BatchNum" :clearable="!disabled"
                                  :disabled="disabled"></el-input>
                      </el-form-item>
                      <el-form-item :class="{'marBot':disabled}">
                        <span class="spanStyle" v-if="!disabled">*示例：“新广出审[2018]666号”</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  </div>
                  <el-form-item label="合作方式" prop="cooperationway" :class="{'marBot':disabled}">
                    <el-select v-model="model.cooperationway" placeholder="请选择" style="width: 100%"
                               :clearable="!disabled" :disabled="disabled" :class="{'notSel': disabled }">
                      <el-option label="联运" value="1"></el-option>
                      <el-option label="CPS" value="2"></el-option>
                      <el-option label="其他" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>

            <!-- 游戏素材 -->
            <el-collapse-item name="3">
              <template slot="title">
                <span><i class="fa fa-gamepad"></i>游戏素材</span>
              </template>
              <el-row :gutter="10" style="margin-bottom: 10px;">
                <el-form-item label="H5游戏链接" prop="demoApp" :class="{'marBot':disabled}" v-if="model.Type==2">
                  <el-input placeholder="请输入H5游戏链接" v-model.trim="model.demoApp" :clearable="!disabled"
                            :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="游戏demo" prop="demoApp" class="demoApp" style="margin-bottom: 8px" v-else>
                  <el-upload :limit="1"
                             :on-exceed="handleExceed"
                             :on-success="success"
                             :on-change='uploadDemoApp'
                             :data="GameId"
                             action="/myGame/upGameMsg"
                             name="demoApp" v-if="!disabled">
                    <el-button :class="{'delImg':disabled }" type="primary" icon="fa fa-upload" plain>本地上传</el-button>
                  </el-upload>
                  <div v-if="model.demoApp && isOk" style="margin: 8px 0;">
                    <el-button type="primary" icon="fa fa-download" plain>
                      <a :href="model.demoApp">游戏demo下载链接</a>
                    </el-button>
                  </div>
                  <div v-if="model.demoApp && isOk">
                    <el-button type="danger" icon="el-icon-delete" plain @click="model.demoApp=''" v-if="!disabled">
                      删除
                    </el-button>
                  </div>
                </el-form-item>
              </el-row>
              <el-row :gutter="10" style="margin-bottom: 10px;">
                <el-col :xs="23" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="游戏ICON" class="ICON" prop="ICON" :class="{'marBot':disabled}">
                        <el-upload class="upload-demo"
                                   action=""
                                   :limit="1"
                                   :on-exceed="handleExceed"
                                   :auto-upload='false'
                                   :on-change='uploadICON'>
                          <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                     :class="disabled?'delImg':''">本地上传
                          </el-button>
                        </el-upload>
                        <div v-if="model.ICON && isOk" style="margin-bottom: 14px;">
                          <img :src="model.ICON" alt="" class="imgICON" style="margin: 10px 0"
                               @click="clickImg($event);dialogImg = true">
                          <el-button type="danger" icon="el-icon-delete" plain @click="model.ICON=''"
                                     :class="disabled?'delImg':''" v-if="!disabled">删除图片
                          </el-button>
                        </div>
                      </el-form-item>
                      <el-form-item>
                        <span class="spanStyle" v-if="!disabled">*512×512像素及以上，大小控制在5MB以下，支持 jpg/png格式</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" style="margin-bottom: 22px;">
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="游戏截图(一)" class="img1" prop="img1" :class="{'marBot':disabled}">
                        <el-upload class="upload-demo"
                                   action=""
                                   :limit="1"
                                   :on-exceed="handleExceed"
                                   :auto-upload='false'
                                   :on-change='uploadImg1'>
                          <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                     :class="disabled?'delImg':''">本地上传
                          </el-button>
                        </el-upload>
                        <div v-if="model.img1 && isOk" style="margin-bottom: 14px;">
                          <img :src="model.img1" alt="" class="imgStyle" style="margin: 10px 0;"
                               @click="clickImg($event);dialogImg = true">
                          <el-button type="danger" icon="el-icon-delete" plain @click="model.img1=''"
                                     :class="disabled?'delImg':''" v-if="!disabled">删除图片
                          </el-button>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="游戏截图(二)" class="img2" prop="img2" :class="{'marBot':disabled}">
                        <el-upload class="upload-demo"
                                   action=""
                                   :limit="1"
                                   :on-exceed="handleExceed"
                                   :auto-upload='false'
                                   :on-change='uploadImg2'>
                          <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                     :class="disabled?'delImg':''">本地上传
                          </el-button>
                        </el-upload>
                        <div v-if="model.img2 && isOk" style="margin-bottom: 14px;">
                          <img :src="model.img2" alt="" class="imgStyle" style="margin: 10px 0;"
                               @click="clickImg($event);dialogImg = true">
                          <el-button type="danger" icon="el-icon-delete" plain @click="model.img2=''"
                                     :class="disabled?'delImg':''" v-if="!disabled">删除图片
                          </el-button>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" style="margin-bottom: 22px;">
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="游戏截图(三)" class="img3" prop="img3" :class="{'marBot':disabled}">
                        <el-upload class="upload-demo"
                                   action=""
                                   :limit="1"
                                   :on-exceed="handleExceed"
                                   :auto-upload='false'
                                   :on-change='uploadImg3'>
                          <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                     :class="disabled?'delImg':''">本地上传
                          </el-button>
                        </el-upload>
                        <div v-if="model.img3 && isOk" style="margin-bottom: 14px;">
                          <img :src="model.img3" alt="" class="imgStyle" style="margin: 10px 0;"
                               @click="clickImg($event);dialogImg = true">
                          <el-button type="danger" icon="el-icon-delete" plain @click="model.img3=''"
                                     :class="disabled?'delImg':''" v-if="!disabled">删除图片
                          </el-button>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="游戏截图(四)" class="img4" prop="img4" :class="{'marBot':disabled}">
                        <el-upload class="upload-demo"
                                   action=""
                                   :limit="1"
                                   :on-exceed="handleExceed"
                                   :auto-upload='false'
                                   :on-change='uploadImg4'>
                          <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                     :class="disabled?'delImg':''">本地上传
                          </el-button>
                        </el-upload>
                        <div v-if="model.img4 && isOk" style="margin-bottom: 14px;">
                          <img :src="model.img4" alt="" class="imgStyle" style="margin: 10px 0;"
                               @click="clickImg($event);dialogImg = true">
                          <el-button type="danger" icon="el-icon-delete" plain @click="model.img4=''"
                                     :class="disabled?'delImg':''" v-if="!disabled">删除图片
                          </el-button>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" style="margin-bottom: 22px;">
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="游戏截图(五)" class="img5" prop="img5" :class="{'marBot':disabled}">
                        <el-upload class="upload-demo"
                                   action=""
                                   :limit="1"
                                   :on-exceed="handleExceed"
                                   :auto-upload='false'
                                   :on-change='uploadImg5'>
                          <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                     :class="disabled?'delImg':''">本地上传
                          </el-button>
                        </el-upload>
                        <div v-if="model.img5 && isOk" style="margin-bottom: 14px;">
                          <img :src="model.img5" alt="" class="imgStyle" style="margin: 10px 0;"
                               @click="clickImg($event);dialogImg = true">
                          <el-button type="danger" icon="el-icon-delete" plain @click="model.img5=''"
                                     :class="disabled?'delImg':''" v-if="!disabled">删除图片
                          </el-button>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item>
                      <span class="spanStyle"
                            v-if="!disabled">*原始游戏截图或设计卖场图，共五张，480×800像素及以上大小控制在5MB以下，支持 jpg/png格式</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <!-- 申请营销资源 -->
            <el-collapse-item name="4">
              <template slot="title">
                <span><i class="el-icon-edit-outline"></i>申请营销资源</span>
              </template>
              <el-row :gutter="10">
                <el-col :xs="23" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="资源申请" prop="Zy" :class="{'marBot':disabled}">
                        <el-select v-model="model.Zy" placeholder="请选择" style="width: 100%" :clearable="!disabled"
                                   :disabled="disabled" :class="{'notSel': disabled }">
                          <el-option label="不申请" value="0"></el-option>
                          <el-option label="申请精品首发" value="1"></el-option>
                          <el-option label="申请普通首发" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <div v-if="model.Zy!=0">
                      <el-form-item label="平台营销广告位" class="Pad" prop="Pad" :class="{'marBot':disabled}">
                        <el-upload class="upload-demo"
                                   action=""
                                   :limit="1"
                                   :on-exceed="handleExceed"
                                   :auto-upload='false'
                                   :on-change='uploadPad'>
                          <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                     :class="disabled?'delImg':''">本地上传
                          </el-button>
                        </el-upload>
                        <div v-if="model.Pad && isOk" style="margin-bottom: 14px;">
                          <img :src="model.Pad" alt="" class="imgStyle" style="margin: 10px 0;"
                               @click="clickImg($event);dialogImg = true">
                          <el-button type="danger" icon="el-icon-delete" plain @click="model.Pad=''"
                                     :class="disabled?'delImg':''" v-if="!disabled">删除图片
                          </el-button>
                        </div>
                      </el-form-item>
                      <el-form-item>
                        <span class="spanStyle" v-if="!disabled">*650×320像素及以上，大小控制在5MB以下，支持 jpg/png格式</span>
                      </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-collapse-item>
        </el-form>
          <!-- 游戏测试与更新 -->
          <div v-show="status == '4' || status == '5'">
            <el-collapse-item name="8" style="margin-top: 1px">
              <template slot="title">
                <span><i class="el-icon-edit"></i>游戏测试与更新</span>
              </template>
              <gameTestInfo></gameTestInfo>
            </el-collapse-item>
          </div>

          <!-- 计费申请 -->
          <el-collapse-item name="5" style="margin-top: 1px">
            <template slot="title">
              <span><i class="el-icon-edit"></i>计费申请</span>
            </template>
            <gameProps v-bind:disabled="disabled"
                       v-bind:model="model">
            </gameProps>
          </el-collapse-item>
          <div v-if="!isUpdate">
            <!-- 游戏评级 -->
            <el-collapse-item name="6">
              <template slot="title">
                <span><i class="el-icon-edit-outline"></i>游戏评级</span>
              </template>
              <div>
                <el-input class="inputStyle" :readonly="true" v-model="gradeModel.score">
                  <template slot="prepend"><span class="inputSpan">游戏评分</span></template>
                </el-input>
                <el-input class="inputStyle" :readonly="true" v-model="gradeModel.grade">
                  <template slot="prepend"><span class="inputSpan">游戏评级</span></template>
                </el-input>
                <el-input class="inputStyle" :readonly="true" v-model="gradeModel.evaluate">
                  <template slot="prepend"><span class="inputSpan">游戏评测</span></template>
                  <el-button slot="append" icon="el-icon-view"  @click="lookAll()"></el-button>
                </el-input>
              </div>
            </el-collapse-item>
            <!-- 操作记录 -->
            <el-collapse-item name="7">
              <template slot="title">
                <span><i class="el-icon-edit-outline"></i>操作记录</span>
              </template>
              <gameOpration></gameOpration>
            </el-collapse-item>
          </div>
        </el-collapse>
        <el-dialog class="MyModelremove" :visible.sync="dialogAudit" :width="$store.state.isMobile?'90%':'70%'"
                   @close="closeIt(resStatus)" center>
          <gameAudit v-bind:dialogUpdate="dialogAudit"
                     v-bind:gameId="gameId"
                     v-on:success="success($event)">
          </gameAudit>
        </el-dialog>
        <el-dialog class="MyModelremove" :visible.sync="dialogLever" :width="$store.state.isMobile?'90%':'70%'"
                   @close="closeIt()" center>
          <gameLever v-bind:dialogLever="dialogLever"
                     v-bind:gameId="gameId"
                     v-on:successLever="successLever()">
          </gameLever>
        </el-dialog>
        <el-dialog class="MyModelremove" :visible.sync="dialogOffLine" :width="$store.state.isMobile?'90%':'70%'"
                   @close="closeIt(resStatus)" center>
          <gameOffline v-bind:dialogOffLine="dialogOffLine"
                       v-bind:gameId="gameId"
                       v-on:successOff="successOff($event)">
          </gameOffline>
        </el-dialog>
        <el-dialog class="MyModelremove" :visible.sync="dialogAuditOffLine" :width="$store.state.isMobile?'90%':'70%'"
                   @close="closeIt(resStatus)" center>
          <gameAuditOffLine v-bind:dialogAuditOffLine="dialogAuditOffLine"
                            v-bind:gameId="gameId"
                            v-on:successOff2="successOff2($event)">
          </gameAuditOffLine>
        </el-dialog>
      </div>
    </el-card>
    <!--放大图片-->
    <el-dialog title="" :visible.sync="dialogImg" modal class="allIMg">
      <img :src="imgSrc"  class="lookImg" v-if="!ispdfs">
      <pdf :src="imgSrc"  class="lookImg" v-if="ispdfs"></pdf>
    </el-dialog>
  </div>
  <!--<div>
    &lt;!&ndash;用户基本信息表单1&#45;&#45;上一步页面&ndash;&gt;
    <el-card class="box-card">
      &lt;!&ndash;工具栏&ndash;&gt;
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <el-button type="text" v-on:click="backIt()" class="bread">
              CP管理
            </el-button>
          </el-breadcrumb-item>
          <el-breadcrumb-item>游戏管理</el-breadcrumb-item>
          <el-breadcrumb-item>当前游戏：{{$route.params.gName || model.gName}}</el-breadcrumb-item>
        </el-breadcrumb>
       &lt;!&ndash; <div style="margin:10px 0 "></div>
        <el-button icon="el-icon-back" v-on:click="$parent.infoManage=true;back();" ></el-button>&ndash;&gt;
       &lt;!&ndash; <el-button icon="el-icon-back" v-on:click="$parent.myGame=true;$router.push({name:'myGame'});" ></el-button>
        <el-button type="primary" icon="el-icon-edit"
                   v-on:click="updateInfo()"
                   v-if="!isUpdate"
                   style="float: right;margin-right: 20px">
          <span>修改资料</span>
        </el-button>&ndash;&gt;
      </div>
      <div>
        <el-row :gutter="10" type="flex" class="row-bg" justify="center">
          <el-col :span="5">
            <span style="color: #409EFF;font: 18px large;">游戏状态——{{setTitles}}</span>
          </el-col>
          <el-col :span="1">
            <el-button v-if="buttonList.lever && status=='0' && (!grade || grade=='0')" size="mini" type="success" @click="lever()">评级</el-button>
            <el-button v-if="buttonList.audit && status=='0' && (grade && grade!='0')" size="mini" type="success" @click="audit()">审核</el-button>
            <el-button v-if="buttonList.test && status=='2' && offstatus=='1'" size="mini" type="success" @click="test()" :disabled="teststatus=='0'">测试</el-button>
            <el-button v-if="buttonList.doit && status=='4' && offstatus=='1'" size="mini" type="success" @click="doIt()">商用</el-button>
            <el-button v-if="buttonList.offline && status=='5' && offstatus=='1'" size="mini" type="success" @click="offLine()">下线</el-button>
            <el-button v-if="buttonList.online && offstatus=='0'" size="mini" type="success" @click="goLine()">上线</el-button>
            <el-button v-if="buttonList.auditOffline && status=='6' && offstatus=='1'" size="mini" type="success" @click="auditOffLine()">下线审核</el-button>
          </el-col>
        </el-row>
      </div>
      <div style="margin:6px 0 "></div><el-collapse v-model="activeNames"  v-loading="loading">
      &lt;!&ndash; 基本信息 &ndash;&gt;
      <el-form ref="form" :model="model" :rules="rules" label-width="200px">
        <el-collapse-item name="1">
          <template slot="title">
            <span class="secondTabs"><i class="el-icon-edit-outline"></i>基本信息</span>
          </template>
          <el-row :gutter="10">
            <el-col :xs="23" :sm="{span: 20, offset: 2}" type="flex" class="row-bg" justify="center">
              <el-form-item label="游戏名称" prop="gName">
                <el-input  placeholder="游戏名称请与安装包内游戏名称一致" v-model.trim="model.gName" :clearable="!disabled" :disabled="disabled"></el-input>
              </el-form-item>
              &lt;!&ndash; <el-form-item label="游戏demo" prop="demoApp" class="demoApp">
                 <el-upload class="upload-demo"
                            action=""
                            :limit="1"
                            :on-exceed="handleExceed"
                            :on-change='uploadDemoApp'
                            :auto-upload='false'>
                   <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                 </el-upload>
                 <div v-if="model.demoApp && isOk" class="imgDiv">
                   <a :href="model.demoApp">游戏demo下载链接</a>
                   <el-button type="text" @click="model.demoApp=''"  v-if="!disabled">删除</el-button>
                 </div>
               </el-form-item>&ndash;&gt;
              <el-row :gutter="10">
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="游戏类型" prop="Type">
                    <el-select v-model="model.Type" placeholder="请选择" style="width: 100%"  :clearable="!disabled" :disabled="disabled">
                      <el-option label="单机" value="0"></el-option>
                      <el-option label="网游" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="游戏分类" prop="Sort">
                    <el-select v-model="model.Sort" placeholder="请选择" style="width: 100%"  :clearable="!disabled" :disabled="disabled">
                      <el-option
                        v-for="item in GameSort"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="游戏介绍" prop="Introduc">
                <el-input
                  type="textarea"
                  :rows="8"
                  placeholder="请输入游戏简介（500字以内）"
                  v-model.trim="model.Introduc" :disabled="disabled">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        &lt;!&ndash; 版权信息 &ndash;&gt;
        <el-collapse-item name="2">
          <template slot="title">
            <span class="secondTabs"><i class="el-icon-edit-outline"></i>版权信息</span>
          </template>
          <div style="color: #F56C6C"  v-if="!disabled">
            注：所有授权文件需原件彩色扫描上传或者复印件加盖公司章彩色扫描上传（不接受拍照图片）。
            所有授权文件支持 jpg/png/zip/rar格式，大小限制为5MB以内。
          </div>
          <el-row :gutter="10">
            <el-col :xs="23" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
              <el-card class="box-card">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="版权授权书" class="Copyright" prop="Copyright">
                      <el-upload class="upload-demo"
                                 action=""
                                 :limit="1"
                                 :on-exceed="handleExceed"
                                 :on-change='uploadCopyright'
                                 :auto-upload="false">
                        <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                      </el-upload>
                      <div v-if="model.Copyright && isOk" class="imgDiv">
                        <img :src="model.Copyright" alt="" class="imgStyle"  @click="clickImg($event);dialogImg = true">
                        <el-button type="text" @click="model.Copyright=''" class="delImg" v-if="!disabled">删除图片</el-button>
                      </div>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="text"  v-if="!disabled">版权授权书模板下载</el-button>
                    </el-form-item>
                    <el-form-item label="版权有效期" prop="CsTime">
                      <el-col :span="12">
                        <div class="block">
                          <el-date-picker type="date"
                                          :disabled="disabled"
                                          placeholder="开始日期"
                                          v-model="model.CsTime"
                                          style="width: 100%;"
                                          :editable="false"
                                          format="yyyy-MM-dd"
                                          value-format="yyyy-MM-dd">
                          </el-date-picker>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item prop="CeTime">
                          <div class="block">
                            <el-date-picker type="date"
                                            :disabled="disabled"
                                            placeholder="结束日期"
                                            v-model="model.CeTime"
                                            style="width: 100%;"
                                            :editable="false"
                                            format="yyyy-MM-dd"
                                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    <el-form-item >
                      <span class="spanStyle"  v-if="!disabled">*该游戏在本平台的版权有效时间</span>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="ip授权" prop="IpHave">
                      <el-radio v-model="model.IpHave" label='0'  :disabled="disabled">无</el-radio>
                      <el-radio v-model="model.IpHave" label='1'  :disabled="disabled">有</el-radio>
                    </el-form-item>
                    <div v-if="model.IpHave=='1'" >
                      <el-form-item label="ip授权链文件" class="Ipis" prop="Ipis">
                        <el-upload class="upload-demo"
                                   action=""
                                   :limit="1"
                                   :on-exceed="handleExceed"
                                   :auto-upload='false'
                                   :on-change='uploadIpis'>
                          <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                        </el-upload>
                        <div v-if="model.Ipis && isOk" class="imgDiv">
                          <img :src="model.Ipis" alt="" class="imgStyle"  @click="clickImg($event);dialogImg = true">
                          <el-button type="text" @click="model.Ipis=''" class="delImg" v-if="!disabled">删除图片</el-button>
                        </div>
                      </el-form-item>
                      <el-form-item >
                        <span class="spanStyle" v-if="!disabled"> *请保证IP授权链完整，若游戏涉及商标证明文件，请一并提供</span>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-card>


              <el-card class="box-card">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="游戏版权" prop="GameCopy">
                      <el-radio v-model="model.GameCopy" label="0"  :disabled="disabled">自研</el-radio>
                      <el-radio v-model="model.GameCopy" label="1"  :disabled="disabled">代理</el-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <div v-if="model.GameCopy=='1'">
                      <el-form-item label="代理授权文件"  class="CopyFile"  prop="CopyFile">
                        <el-upload class="upload-demo"
                                   action=""
                                   :limit="1"
                                   :on-exceed="handleExceed"
                                   :auto-upload='false'
                                   :on-change='uploadCopyFile'>
                          <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                        </el-upload>
                        <div v-if="model.CopyFile && isOk" class="imgDiv">
                          <img :src="model.CopyFile" alt="" class="imgStyle"  @click="clickImg($event);dialogImg = true">
                          <el-button type="text" @click="model.CopyFile=''" class="delImg" v-if="!disabled">删除图片</el-button>
                        </div>
                      </el-form-item>
                      <el-form-item >
                        <span class="spanStyle" v-if="!disabled"> *请保证IP授权链完整，若游戏涉及商标证明文件，请一并提供</span>
                      </el-form-item>
                    </div>

                    <div v-if="model.GameCopy=='0'">
                      <el-form-item label="软件著作权登记证书" class="Zzdjs" prop="Zzdjs">
                        <el-upload class="upload-demo"
                                   action=""
                                   :limit="1"
                                   :on-exceed="handleExceed"
                                   :auto-upload='false'
                                   :on-change='uploadZzdjs'>
                          <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                        </el-upload>
                        <div v-if="model.Zzdjs && isOk" class="imgDiv">
                          <img :src="model.Zzdjs" alt="" class="imgStyle"  @click="clickImg($event);dialogImg = true">
                          <el-button type="text" @click="model.Zzdjs=''" class="delImg" v-if="!disabled">删除图片</el-button>
                        </div>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <div v-if="model.GameCopy=='0'">
                  <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="软著登记证编号" prop="Znumber">
                      <el-input placeholder="请输入软著登记证编号" v-model.trim="model.Znumber" :clearable="!disabled" :disabled="disabled"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="著作权人名称" prop="ZName">
                      <el-input placeholder="请输入著作权人名称" v-model.trim="model.ZName" :clearable="!disabled" :disabled="disabled"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
              </el-card>
              <el-card class="box-card">
                <el-form-item label="出版物号（ISBN）核发单" class="ISBN"  prop="ISBN">
                  <el-upload class="upload-demo"
                             action=""
                             :limit="1"
                             :on-exceed="handleExceed"
                             :auto-upload='false'
                             :on-change='uploadISBN'>
                    <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                  </el-upload>
                  <div v-if="model.ISBN " class="imgDiv">
                    <img :src="model.ISBN" alt="" class="imgStyle"  @click="clickImg($event);dialogImg = true">
                    <el-button type="text" @click="model.ISBN=''" class="delImg" v-if="!disabled">删除图片</el-button>
                  </div>
                </el-form-item>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="出版物号" prop="ISBNNum">
                      <el-input placeholder="请输入出版物号" v-model.trim="model.ISBNNum" :clearable="!disabled" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <span style="color: #F56C6C;" v-if="!disabled">*示例：“ISBN 888-8-8888-8888-8”</span>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="广电总局批文号" prop="BatchNum">
                      <el-input placeholder="请输入广电总局批文号" v-model.trim="model.BatchNum" :clearable="!disabled" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <span class="spanStyle" v-if="!disabled">*示例：“新广出审[2018]666号”</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="出版服务单位全称" prop="BatchName">
                      <el-input placeholder="请输入出版服务单位全称" v-model.trim="model.BatchName" :clearable="!disabled" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <span style="color: #F56C6C;" v-if="!disabled">*示例：“三辰影库音像出版社”</span>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="文化部备案号（选填）" prop="PutRecords">
                      <el-input placeholder="请输入文化部备案号" v-model.trim="model.PutRecords" :clearable="!disabled" :disabled="disabled"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="文化部备案文件" class="PutFile" prop="PutFile">
                  <el-upload class="upload-demo"
                             action=""
                             :limit="1"
                             :on-exceed="handleExceed"
                             :auto-upload='false'
                             :on-change='uploadPutFile'>
                    <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                  </el-upload>
                  <div v-if="model.PutFile && isOk" class="imgDiv">
                    <img :src="model.PutFile" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                    <el-button type="text" @click="model.PutFile=''" class="delImg" v-if="!disabled">删除图片</el-button>
                  </div>

                </el-form-item>
                <el-form-item>
                  <span class="spanStyle" v-if="!disabled"> *国产游戏：需上线30日内提供备案电子标签截图</span>
                  <span class="spanStyle" v-if="!disabled">*进口游戏：需上线前提供备案电子标签截图</span>
                </el-form-item>
              </el-card>
              <el-card class="box-card">
                <el-form-item label="广电总局出版出版批复文件（选填）" class="ApproveFile">
                  <el-upload class="upload-demo"
                             action=""
                             :limit="1"
                             :on-exceed="handleExceed"
                             :auto-upload='false'
                             :on-change='uploadApproveFile'>
                    <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                  </el-upload>
                  <div v-if="model.ApproveFile && isOk" class="imgDiv">
                    <img :src="model.ApproveFile" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                    <el-button type="text" @click="model.ApproveFile=''" class="delImg" v-if="!disabled">删除图片</el-button>
                  </div>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-collapse-item>

        &lt;!&ndash; 游戏素材 &ndash;&gt;
        <el-collapse-item name="3">
          <template slot="title">
            <span class="secondTabs"><i class="el-icon-edit-outline"></i>游戏素材</span>
          </template>
          &lt;!&ndash;<el-row :gutter="10">
            <el-col :xs="23" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
              <el-form-item label="游戏ICON" class="ICON" prop="ICON">
                <el-upload class="upload-demo"
                           action=""
                           :limit="1"
                           :on-exceed="handleExceed"
                           :auto-upload='false'
                           :on-change='uploadICON'>
                  <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                </el-upload>
                <div v-if="model.ICON && isOk" class="imgDiv">
                  <img :src="model.ICON" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                  <el-button type="text" @click="model.ICON=''" class="delImg" v-if="!disabled">删除图片</el-button>
                </div>
              </el-form-item>
              <el-form-item>
                <span class="spanStyle" v-if="!disabled">*512×512像素及以上，大小控制在200k以下，支持 jpg/png格式</span>
              </el-form-item>
              <el-form-item label="游戏截图" class="Img" prop="">
                <el-upload class="upload-demo"
                           action=""
                           :limit="5"
                           :on-exceed="handleExceed2"
                           :auto-upload='false'
                           multiple
                           :on-change='uploadImg'>
                  <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                </el-upload>
                <div>
                  <div v-if="model.img1 && isOk" class=" img" style="margin-left: 0">
                    <img :src="model.img1" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                    <el-button type="text" @click="model.img1=''" class="delImg" v-if="!disabled">删除图片</el-button>
                  </div>
                  <div v-if="model.img2 && isOk" class="img">
                    <img :src="model.img2" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                    <el-button type="text" @click="model.img2=''" class="delImg" v-if="!disabled">删除图片</el-button>
                  </div>
                  <div v-if="model.img3 && isOk" class=" img">
                    <img :src="model.img3" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                    <el-button type="text" @click="model.img3=''" class="delImg" v-if="!disabled">删除图片</el-button>
                  </div>
                  <div v-if="model.img4 && isOk" class=" img">
                    <img :src="model.img4" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                    <el-button type="text" @click="model.img4=''" class="delImg" v-if="!disabled">删除图片</el-button>
                  </div>
                  <div v-if="model.img5 && isOk" class="img">
                    <img :src="model.img5" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                    <el-button type="text" @click="model.img5=''" class="delImg" v-if="!disabled">删除图片</el-button>
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <span class="spanStyle" v-if="!disabled">*原始游戏截图或设计卖场图，共五张，480×800像素及以上大小控制在500k以下，支持 jpg/png格式</span>
              </el-form-item>
            </el-col>
          </el-row>&ndash;&gt;
          <el-form-item label="游戏demo" prop="demoApp" class="demoApp">
            <el-upload class="upload-demo"
                       action=""
                       :limit="1"
                       :on-exceed="handleExceed"
                       :on-success="success"
                       :on-change='uploadDemoApp'
                       :data="GameId"
                       action="/myGame/upGameMsg"
                       name="demoApp">
              <el-button type="primary" plain v-if="!disabled" style="margin-left: 0;">本地上传</el-button>
            </el-upload>
            <div v-if="model.demoApp && isOk" class="imgDiv">
              <a :href="model.demoApp">游戏demo下载链接</a>
              <el-button type="text" @click="model.demoApp=''"  v-if="!disabled">删除</el-button>
            </div>
          </el-form-item>
            <el-row :gutter="10">
              <el-col :xs="23" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="游戏ICON" class="ICON" prop="ICON">
                      <el-upload class="upload-demo"
                                 action=""
                                 :limit="1"
                                 :on-exceed="handleExceed"
                                 :auto-upload='false'
                                 :on-change='uploadICON'>
                        <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                      </el-upload>
                      <div v-if="model.ICON && isOk" class="imgDiv">
                        <img :src="model.ICON" alt="" class="imgStyle"  @click="clickImg($event);dialogImg = true">
                        <el-button type="text" @click="model.ICON=''" class="delImg" v-if="!disabled">删除图片</el-button>
                      </div>
                    </el-form-item>
                    <el-form-item>
                      <span class="spanStyle" v-if="!disabled">*512×512像素及以上，大小控制在5MB以下，支持 jpg/png格式</span>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="游戏截图(一)" class="img1" prop="img1">
                      <el-upload class="upload-demo"
                                 action=""
                                 :limit="1"
                                 :on-exceed="handleExceed"
                                 :auto-upload='false'
                                 :on-change='uploadImg1'>
                        <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                      </el-upload>
                      <div v-if="model.img1 && isOk" class="imgDiv">
                        <img :src="model.img1" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                        <el-button type="text" @click="model.img1=''" class="delImg" v-if="!disabled">删除图片</el-button>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :xs="23" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="游戏截图(二)" class="img2" prop="img2">
                      <el-upload class="upload-demo"
                                 action=""
                                 :limit="1"
                                 :on-exceed="handleExceed"
                                 :auto-upload='false'
                                 :on-change='uploadImg2'>
                        <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                      </el-upload>
                      <div v-if="model.img2 && isOk" class="imgDiv">
                        <img :src="model.img2" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                        <el-button type="text" @click="model.img2=''" class="delImg" v-if="!disabled">删除图片</el-button>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="游戏截图(三)" class="img3" prop="img3">
                      <el-upload class="upload-demo"
                                 action=""
                                 :limit="1"
                                 :on-exceed="handleExceed"
                                 :auto-upload='false'
                                 :on-change='uploadImg3'>
                        <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                      </el-upload>
                      <div v-if="model.img3 && isOk" class="imgDiv">
                        <img :src="model.img3" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                        <el-button type="text" @click="model.img3=''" class="delImg" v-if="!disabled">删除图片</el-button>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :xs="23" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="游戏截图(四)" class="img4" prop="img4">
                      <el-upload class="upload-demo"
                                 action=""
                                 :limit="1"
                                 :on-exceed="handleExceed"
                                 :auto-upload='false'
                                 :on-change='uploadImg4'>
                        <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                      </el-upload>
                      <div v-if="model.img4 && isOk" class="imgDiv">
                        <img :src="model.img4" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                        <el-button type="text" @click="model.img4=''" class="delImg" v-if="!disabled">删除图片</el-button>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="游戏截图(五)" class="img5" prop="img5">
                      <el-upload class="upload-demo"
                                 action=""
                                 :limit="1"
                                 :on-exceed="handleExceed"
                                 :auto-upload='false'
                                 :on-change='uploadImg5'>
                        <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                      </el-upload>
                      <div v-if="model.img5 && isOk" class="imgDiv">
                        <img :src="model.img5" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                        <el-button type="text" @click="model.img5=''" class="delImg" v-if="!disabled">删除图片</el-button>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item>
                  <span class="spanStyle" v-if="!disabled">*原始游戏截图或设计卖场图，共五张，480×800像素及以上大小控制在5MB以下，支持 jpg/png格式</span>
                </el-form-item>
              </el-col>
            </el-row>
        </el-collapse-item>
        &lt;!&ndash; 申请营销资源 &ndash;&gt;
        <el-collapse-item name="4">
          <template slot="title">
            <span class="secondTabs"><i class="el-icon-edit-outline"></i>申请营销资源</span>
          </template>
          <el-row :gutter="10">
            <el-col :xs="23" :sm="{span: 18, offset: 3}" type="flex" class="row-bg" justify="center">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="资源申请" prop="Zy">
                    <el-select v-model="model.Zy" placeholder="请选择" style="width: 100%"  :clearable="!disabled" :disabled="disabled">
                      <el-option label="不申请" value="0"></el-option>
                      <el-option label="申请精品首发" value="1"></el-option>
                      <el-option label="申请普通首发" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="平台营销广告位" class="Pad" prop="Pad">
                    <el-upload class="upload-demo"
                               action=""
                               :limit="1"
                               :on-exceed="handleExceed"
                               :auto-upload='false'
                               :on-change='uploadPad'>
                      <el-button type="primary" plain v-if="!disabled">本地上传</el-button>
                    </el-upload>
                    <div v-if="model.Pad && isOk" class="imgDiv">
                      <img :src="model.Pad" alt="" class="imgStyle" @click="clickImg($event);dialogImg = true">
                      <el-button type="text" @click="model.Pad=''" class="delImg" v-if="!disabled">删除图片</el-button>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <span class="spanStyle" v-if="!disabled">*650×320像素及以上，大小控制在5MB以下，支持 jpg/png格式</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-form>
      &lt;!&ndash; 计费申请 &ndash;&gt;
      <el-collapse-item name="5" style="margin-top: 1px">
        <template slot="title">
          <span class="secondTabs"><i class="el-icon-edit-outline"></i>计费申请</span>
        </template>
        <gameProps v-bind:disabled="disabled"
                   v-bind:model="model">
        </gameProps>
      </el-collapse-item>
      <div v-if="!isUpdate">
        &lt;!&ndash; 游戏评级 &ndash;&gt;
        <el-collapse-item name="6">
          <template slot="title">
            <span class="secondTabs"><i class="el-icon-edit-outline"></i>游戏评级</span>
          </template>
          <div>
            <el-input  class="inputStyle" :readonly="true" v-model="gradeModel.score">
              <template slot="prepend"><span  class="inputSpan">游戏评分</span></template>
            </el-input>
            <el-input   class="inputStyle" :readonly="true" v-model="gradeModel.grade">
              <template slot="prepend"><span class="inputSpan">游戏评级</span></template>
            </el-input>
            <el-input  class="inputStyle" :readonly="true" v-model="gradeModel.evaluate">
              <template slot="prepend"><span class="inputSpan">游戏评测</span></template>
            </el-input>
          </div>
        </el-collapse-item>
        &lt;!&ndash; 操作记录 &ndash;&gt;
        <el-collapse-item name="7">
          <template slot="title">
            <span class="secondTabs"><i class="el-icon-edit-outline"></i>操作记录</span>
          </template>
          <gameOpration></gameOpration>
        </el-collapse-item>
      </div>

    </el-collapse>

      &lt;!&ndash;放大图片&ndash;&gt;
      <el-dialog title="" :visible.sync="dialogImg" modal>
        <div style="border-bottom: 1px solid #ebeef5;">
          <p style="font-size: 16px;font-weight: 600;color: #2B6A65;padding-bottom: 10px">查看图片</p>
        </div>
        <div style="margin:10px 0 "></div>
        <div><img :src="imgSrc" alt="" style="width: 100%;height: 100%;"></div>
      </el-dialog>

      <div style="margin:10px 0 "></div>
      <div style="text-align: center" v-if="isUpdate">
        <el-button type="primary" icon="el-icon-success" v-on:click="commitInfo()" >提交信息</el-button>
        <el-button type="info" icon="el-icon-error" v-on:click="reset();reUpdate()">取消修改</el-button>
      </div>
    </el-card>
    <el-dialog  :visible.sync="dialogAudit" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
      <gameAudit v-bind:dialogUpdate = "dialogAudit"
                 v-bind:gameId="gameId"
                 v-on:success="success()">
      </gameAudit>
    </el-dialog>
    <el-dialog  :visible.sync="dialogLever" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
      <gameLever v-bind:dialogLever = "dialogLever"
                 v-bind:gameId="gameId"
                 v-on:successLever="successLever()">
      </gameLever>
    </el-dialog>
    <el-dialog  :visible.sync="dialogOffLine" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
      <gameOffline v-bind:dialogOffLine = "dialogOffLine"
                   v-bind:gameId="gameId"
                   v-on:successOff="successOff()">
      </gameOffline>
    </el-dialog>
    <el-dialog  :visible.sync="dialogAuditOffLine" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
      <gameAuditOffLine v-bind:dialogAuditOffLine = "dialogAuditOffLine"
                        v-bind:gameId="gameId"
                        v-on:successOff2="successOff2()">
      </gameAuditOffLine>
    </el-dialog>
  </div>-->
</template>

<script>
  import pdf from 'vue-pdf'
  import Form from '../../common/form'
  import myGame from '../../common/store/myGame'
  import gameSort from '../../common/store/gameSort'
  var reg = require('../../common/commonMethods.js')
  import gameOpration from './gameOpration.vue'
  import gameProps from './gameProps.vue'
  import gameAudit from './gameAudit.vue'
  import gameLever from './gameLever.vue'
  import gameOffline from './gameOffline.vue'
  import gameAuditOffLine from './gameAuditOffLine.vue'
  import gameTestInfo from './gameTestInfo.vue'

  var form = new Form({store: myGame});
  form.components = {
    'gameOpration': gameOpration,
    'gameProps': gameProps,
    'gameAudit': gameAudit,
    'gameLever': gameLever,
    'gameOffline': gameOffline,
    'gameAuditOffLine': gameAuditOffLine,
    'gameTestInfo': gameTestInfo,
    pdf
  }
  var model = function () {
    return {
      status: 0, GameId: '',gamelabel:'',subhead:'',privateKey:'',typetag:[],ispaymoney:'1',cooperationway:'',
      gName: '', demoApp: '', Type: '0', Sort:'', Introduc:'',testserverip:'',officialserverip:'',
      Copyright: '', CsTime: '', CeTime: '',
      IpHave: '0', Ipis: '',
      GameCopy: '0', CopyFile: '', Zzdjs: '', Znumber: '', ZName: '',
      ISBN: '', ISBNNum: '', BatchNum: '', BatchName: '', PutRecords: '', PutFile: '',
      ApproveFile: '',
      ICON: '', Zy: '2', Pad: '', img1: '', img2: '', img3: '', img4: '', img5: '',
    }
  }
  /*form.watch={
    '$route' (to, from) {
      if(from.path=='/gameSetForm/new'){
        this.getList()
      }
      if(from.path=='/gameSetForm/updateAll'){
        this.getList()
      }
    },
    'filters.gameId': function (val) {
      if (val) {
        this.getGameName()
      }
    },
  }*/
  form.data = function () {
    return {
      loading: false,
      dialogVisible: false,
      dialogImg: false,
      showImg: false,
      imgSrc: '',ispdfs:0,
      model: model(),
      GameId: {},
      typetagDatas:[],
      tag:[],
      doits:0,
      isOk: true,
      activeNames: ['1', '2', '3', '4', '5', '6', '7','8'],
      isUpdate: false,
      disabled: true,

      setTitles: '',
      setTitlesCls: '',
      setTitlesIcon: '',
      status: '',
      offstatus: '',
      grade: '',
      teststatus: '',

      dialogAudit: false,
      dialogLever: false,
      dialogOffLine: false,
      dialogAuditOffLine: false,
      resStatus: '',

      gameId: '',
      gradeModel: {score: '', grade: '', evaluate: ''},
      rules: {
        gName: [{required: true, message: '请输入游戏名称', trigger: 'blur'}],
        subhead:[{required: true, message: '请输入一句话简介', trigger: 'blur'}],
        cooperationway: [{required: true, message: '请选择合作方式', trigger: 'change'}],
        demoApp: [{required: true, message: '请上传游戏demo', trigger: 'blur'}],
        Type: [{required: true, message: '请选择游戏类型', trigger: 'change'}],
        Sort: [{required: true, message: '请选择游戏分类', trigger: 'change'}],
        typetag: [{required: true, message: '请选择游戏标签', trigger: 'blur'},],
        ispaymoney: [{required: true, message: '请选择游戏是否付费', trigger: 'blur'},],
        Introduc: [{required: true, message: '请输入游戏介绍', trigger: 'blur'},
          {min: 1, max: 500, message: '长度在 500字以内', trigger: 'blur'}],
        Copyright: [{required: true, message: '请上传版权授权书', trigger: 'blur'}],
        CsTime: [{required: true, message: '请选择时间', trigger: 'change'}],
        CeTime: [{required: true, message: '请选择时间', trigger: 'change'},
          {required: true, validator: this.cTime, trigger: 'blur'}],
        IpHave: [{required: true, message: '请选择ip授权', trigger: 'change'}],
        Ipis: [{required: true, message: '请上传ip授权链文件', trigger: 'blur'}],
        GameCopy: [{required: true, message: '请选择游戏版权', trigger: 'change'}],
        CopyFile: [{required: true, message: '请上传代理授权文件', trigger: 'blur'}],
        Zzdjs: [{required: true, message: '请上传软件著作权登记证书', trigger: 'blur'}],
        Znumber: [{required: true, validator: reg.RegisterSign, trigger: 'blur'}],
        ZName: [{required: true, message: '请输入著作权人名称', trigger: 'blur'}],
        ISBN: [{required: true, message: '出版物号（ISBN）核发单', trigger: 'blur'}],
        ISBNNum: [{required: true, validator: reg.RegisterSign, trigger: 'blur'}],
        BatchNum: [{required: true, validator: reg.RegisterSign, trigger: 'blur'}],
        BatchName: [{required: true, validator: reg.RegisterSign, trigger: 'blur'}],
       /* PutFile: [{required: true, message: '请上传文化部备案文件', trigger: 'blur'}],
        PutRecords:[{required: true, message: '请输入文化部备案号', trigger: 'blur' }],*/
        ApproveFile:[{ required: true, message: '请上传广电总局出版出版批复文件', trigger: 'blur' }],
        ICON: [{required: true, message: '请输入游戏ICON', trigger: 'blur'}],
        Zy: [{required: true, message: '请选择资源申请', trigger: 'change'}],
        Pad: [{required: true, message: '请上传平台营销广告', trigger: 'blur'}],
        img1: [{required: true, message: '请上传游戏截图', trigger: 'blur'}],
        img2: [{required: true, message: '请上传游戏截图', trigger: 'blur'}],
        img3: [{required: true, message: '请上传游戏截图', trigger: 'blur'}],
        img4: [{required: true, message: '请上传游戏截图', trigger: 'blur'}],
        img5: [{required: true, message: '请上传游戏截图', trigger: 'blur'}],
      },
      /*GameSort: [{value: '1', label: '角色扮演'},
        {value: '2', label: '动作冒险'},
        {value: '3', label: '益智休闲'},
        {value: '4', label: '体育竞技'},
        {value: '5', label: '策略塔防'},
        {value: '6', label: '模拟经营'},
        {value: '7', label: '棋牌麻将'},
        {value: '8', label: '跑酷赛车'},
        {value: '9', label: '儿童教育'},
        {value: '10', label: '卡牌游戏'},
        {value: '0', label: '其他'},
      ],*/
      buttonList: {
        search: false,
        audit: false,
        view: false,
        offline: false,
        export: false,
        online: false,
        auditOffline: false,
        test: false,
        doit: false,
        lever: false
      },
    }
  }
  form.watch = {
    dialogOffLine(val) {
      if (val) {
        $('.MyContainerCon').css('position', 'static');
      } else {
        $('.MyContainerCon').css('position', 'absolute');
      }
    },
    dialogAudit(val) {
      if (val) {
        $('.MyContainerCon').css('position', 'static');
      } else {
        $('.MyContainerCon').css('position', 'absolute');
      }
    },
    dialogLever(val) {
      if (val) {
        $('.MyContainerCon').css('position', 'static');
      } else {
        $('.MyContainerCon').css('position', 'absolute');
      }
    },
    dialogAuditOffLine(val) {
      if (val) {
        $('.MyContainerCon').css('position', 'static');
      } else {
        $('.MyContainerCon').css('position', 'absolute');
      }
    },
    'model.Sort':function (val) {
      if(val){
        this.getTypeTag()
      }
    },
    'typetagDatas':function (val) {
      if(val.length){
        this.settypetagArray()
      }
    },
  },
    form.mounted = function () {
      this.$log("myGameInfo mounted", this)
      this.getAction()
      this.get()
      this.getGrade()
      this.setTitle()
      this.initButton(3,9)
      this.getTypeTag()
    }
  form.computed = {
    gameSort:gameSort.data,
  }
  form.methods.lookAll=function () {
    this.$alert(this.gradeModel.evaluate, '游戏测评', {
      confirmButtonText: '确定',
      center: true,
      type: 'info ',
      showConfirmButton:false
    });
  }
  form.methods.getTypeTag=function () {
    this.$http['post']('/myGame/getGameTag',{gameType:this.model.Sort} )
      .then((response) => {
        this.typetagDatas=response.data.data
      })
      .catch((response) => {

      })
  }
  form.methods.settypetag = function(){
    var temp =  ''
    for(var va of this.tag){
      temp+=','+va
    }
    this.model.typetag=temp.substring(1)
  }
  form.methods.settypetagArray = function(){
    if(this.doits==0){
      if(this.model.typetag){
        this.tag=this.model.typetag.toString().split(',')
        for(var i=0;i<this.tag.length;i++){
          this.tag[i]=parseInt(this.tag[i])
        }
        var temp =  ''
        for(var item of this.typetagDatas){
          for(var va of this.tag){
            if(va == item.id){
              temp+=','+item.tag
            }
          }
        }
        this.doits=1;
        this.model.typetag=temp.substring(1)
      }else{
        return
      }

    }
  },
  //测试接口
  form.methods.getStatus222 = function () {
    var gameId = this.$route.params.id;
    var params = {gameId: gameId}
    this.$http['post']('/queryInfo/queryByGameId', {params: params})
      .then((response) => {
        console.log(response.data.data[0])
      })
      .catch((response) => {
      })
  }
  form.methods.getStatus223 = function () {
    var gameId = this.$route.params.id;
    var params = {customerId: 114, gameId: gameId, propId: 10525}
    this.$http['post']('/queryInfo/queryPropByGid', {params: params})
      .then((response) => {
        console.log(response.data.data[0])
      })
      .catch((response) => {
      })
  }
  //判断是查看还是修改
  form.methods.getAction = function () {
    if (this.$route.params.action == "update") {
      this.isUpdate = true;
      this.disabled = false;
      this.activeName = ['1', '2', '3', '4']
    }
  }
  //获取游戏评测Grade
  form.methods.getGrade = function () {
    var id = this.$route.params.id
    var params = {gameId: id}
    this.$http['post']('/myGame/GetGameAdudit', params)
      .then((response) => {
        if (response.data.data) {
          this.gradeModel = response.data.data
          this.grade = response.data.data.grade
          this.teststatus = response.data.data.teststatus
        }
        if (this.gradeModel.grade == '0') {
          this.gradeModel.grade = ''
          this.gradeModel.score = ''
        }

        this.loading = false
      })
      .catch((response) => {
        this.loading = false
      })
  }
  //获取状态
  form.methods.getStatus = function () {
    this.loading = true;
    var gameId = this.$route.params.id;
    var type = '2';
    var typeObj = {id: gameId, type: type}
    this.$http['post']('/joinup/getStatusByType', {typeObj: typeObj})
      .then((response) => {
        this.status = response.data.data[0].status
        this.offstatus = response.data.data[0].offstatus
        this.settitle()
        this.loading = false
      })
      .catch((response) => {
        this.loading = false
      })
  }
  //设置状态
  form.methods.setTitle = function () {
    if (this.status == '') {
      if (this.$route.params.status == "0" || this.$route.params.status) {
        this.status = this.$route.params.status
        this.offstatus = this.$route.params.offstatus
        this.settitle()
      } else {
        this.getStatus()
      }
    }
  }
  form.methods.settitle = function () {
    if (this.status == "0") {
      this.setTitles = '待审核'
      this.setTitlesCls = 'await'
      this.setTitlesIcon = 'el-icon-edit-outline'
    }
    if (this.status == "1") {
      this.setTitles = '审核不通过'
      this.setTitlesCls = 'no-pass'
      this.setTitlesIcon = 'fa fa-times'
    }
    if (this.status == "2") {
      this.setTitles = '待测试'
      this.setTitlesCls = 'await'
      this.setTitlesIcon = 'fa fa-code-fork'
    }
    if (this.status == "3") {
      this.setTitles = '测试不通过'
      this.setTitlesCls = 'no-pass'
      this.setTitlesIcon = 'fa fa-forward'
    }
    if (this.status == "4") {
      this.setTitles = '待商用'
      this.setTitlesCls = 'await'
      this.setTitlesIcon = 'fa fa-comments-o'
    }
    if (this.status == "5") {
      this.setTitles = '商用'
      this.setTitlesCls = 'finish-pass'
      this.setTitlesIcon = 'fa fa-check'
    }
    if (this.status == "6") {
      this.setTitles = '下线待审核'
      this.setTitlesCls = 'no-pass'
      this.setTitlesIcon = 'el-icon-edit-outline'
    }
    if (this.offstatus == "0") {
      this.setTitles = '已下线'
      this.setTitlesCls = 'no-pass'
      this.setTitlesIcon = 'fa fa-times'
    }
  }
  form.methods.cTime = function (start, end, callback) {
    start = this.model.CsTime
    end = this.model.CeTime
    this.vailDate(start, end, callback)
  }
  //日期验证（开始日期小于结束日期）
  form.methods.vailDate = function (start, end, callback) {
    var dateIsOk = reg.dateIsOk(start, end)
    var endit = end
    if (!dateIsOk) {
      this.$alert('截止日期不能小于开始日期!', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      }).then(() => {
        callback(new Error('请输入正确的日期'));
      })
    } else {
      callback()
    }

  }
  /*!//点击修改资料
  form.methods.updateInfo=function (){
    this.isUpdate=true;
    this.disabled=false;
    this.activeNames= ['1','2','3','4','5']
    this.isOk=true
  }*/
  //点击取消修改
  form.methods.reUpdate = function () {
    this.isUpdate = false;
    this.disabled = true;
    this.activeNames = ['5', '6', '7']
  }
  //图片限制1 大小类型（单位M）
  form.methods.limitIMG = function (file, fileList, size) {
    var imgType = file.raw.type
    var imgSize = Math.floor(file.raw.size / 1024 / 1024);
    if (imgType !== 'image/jpeg' && imgType !== 'image/png' && imgType !== 'application/zip' && imgType !== '' && imgType !=='application/pdf') {
      this.$alert('上传文件支持只能是 jpg/png/zip/rar/pdf格式！', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      });
      fileList.shift()
    } else if (imgSize > size) {
      this.$alert('上传图片大小不能超过' + size + 'MB!', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      });
      fileList.shift()
    } else {
      return fileList
    }
  }
  //图片限制2 大小 类型 像素（单位KB）
  form.methods.limitIMG2 = function (file, fileList, size) {
    var imgType = file.raw.type
    var imgSize = Math.floor(file.raw.size / 1024);
    if (imgType !== 'image/jpeg' && imgType !== 'image/png') {
      this.$alert('上传文件支持只能是 jpg/png格式！', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      });
      fileList.shift()
    } else if (imgSize > size) {
      this.$alert('上传图片大小不能超过' + size + 'kb!', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      });
      fileList.shift()
    } else {
      return fileList
    }
  }
  //游戏demo限制
  form.methods.limitDemo = function (file, fileList) {
    var demoType = file.raw.type
    if (demoType !== 'ipaapplication/octet-stream.ipa' && demoType !== 'apkapplication/vnd.android.package-archive') {
      this.$alert('游戏demo只能是 apk/ipa格式！', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      });
      fileList.shift()
    } else {
      this.GameId.GameId = this.model.GameId
      return fileList
    }
  }
  //游戏demo成功后
  form.methods.success = function (response, file, fileList) {
    if (response.respCode == "00") {
      this.$alert('游戏demo上传成功！', '温馨提示', {
        confirmButtonText: '确定',
        type: 'success'
      }).then(() => {
        this.model.demoApp = file.raw;//demoApp
      });
    } else {
      this.$alert('游戏demo上传失败，请重新上传！', '温馨提示', {
        confirmButtonText: '确定',
        type: 'error'
      }).then(() => {

      });
    }

  }
  form.methods.uploadDemoApp = function (file, fileList) {
    this.limitDemo(file, fileList)
  },
    form.methods.uploadCopyright = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'Copyright')
      }
    },
    form.methods.uploadIpis = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'Ipis')
      }
    },
    form.methods.uploadCopyFile = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'CopyFile')
      }
    },
    form.methods.uploadZzdjs = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'Zzdjs')
      }
    },
    form.methods.uploadISBN = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'ISBN ')
      }
    },
    form.methods.uploadPutFile = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'PutFile')
      }
    },
    form.methods.uploadApproveFile = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'ApproveFile')
      }
    },
    form.methods.uploadICON = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'ICON ')
      }
    },
    /*  form.methods.uploadImg= function(file,fileList){
        if(this.limitIMG2(file, fileList,500)) {
          this.changeUpload(file, fileList, 'Img')
        }
      },*/
    form.methods.uploadImg1 = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'img1')
      }
    },
    form.methods.uploadImg2 = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'img2')
      }
    },
    form.methods.uploadImg3 = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'img3')
      }
    },
    form.methods.uploadImg4 = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'img4')
      }
    },
    form.methods.uploadImg5 = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'img5')
      }
    },
    form.methods.uploadPad = function (file, fileList) {
      if (this.limitIMG(file, fileList, 5)) {
        this.changeUpload(file, fileList, 'Pad')
      }
    },
    //上传提醒每次只能上传一张图片
    form.methods.handleExceed = function (files, fileList) {
      this.$alert('每次请选择 1 个文件进行上传！', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      });
    }
  //上传提醒游戏截图5张
  form.methods.handleExceed2 = function (files, fileList) {
    this.$alert('请选择 5 张游戏截图进行上传！', '温馨提示', {
      confirmButtonText: '确定',
      center: true,
      type: 'warning'
    });
  }
  //上传预览
  form.methods.changeUpload = function (file, fileList, className) {
    var imgType = file.raw.type
    if (imgType == 'application/zip' || imgType == '' || imgType=='application/pdf') {
      return
    } else {
      var className = '.' + className + ' ' + '.el-upload-list'
      var fileLists = fileList;
      this.$nextTick(
        () => {
          let upload_list_li = document.querySelector(className).children;
          for (let i = 0; i < upload_list_li.length; i++) {
            let li_a = upload_list_li[i];
            //li样式
            li_a.setAttribute('style', "width: 250px;height: 150px;margin:10px;float:left;margin-bottom: 25px;");
            let imgElement = document.createElement("img");
            imgElement.setAttribute('src', fileLists[i].url);
            //img样式
            imgElement.setAttribute('style', "width: 250px;height: 150px;");
            if (li_a.lastElementChild.nodeName !== 'IMG') {
              li_a.appendChild(imgElement);
            }
          }
        });
    }

    /*let upload_list_li = document.getElementsByClassName('el-upload-list')[index].children;
    for (let i = 0; i < upload_list_li.length; i++) {
      let li_a = upload_list_li[i];
      let imgElement = document.createElement("img");
      imgElement.setAttribute('src', fileLists[i].url);
      imgElement.setAttribute('style', "width: 250px;height: 150px;");
      if (li_a.lastElementChild.nodeName !== 'IMG') {
        li_a.appendChild(imgElement);
      }
    }*/

  },
    //提交信息
    form.methods.commitInfo = function () {
      this.model.status = 1;
      this.save()
    },
    //删除一行计费列表
    form.methods.delProps = function (index, rows, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$http['post']('/myGame/delProps', {propId: row.propId})
          .then((response) => {
            rows.splice(index, 1);
            this.loading = false
            this.$alert('删除成功！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'success'
            });
          })
          .catch((response) => {
            this.loading = false
            this.$alert('删除失败！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'error'
            });
          })
      }).catch(() => {
      });
    };
  //保存添加一行计费,并保存入数据库
  form.methods.saveJF = function () {
    var tempData = {}
    for (var key in this.modelData) {
      tempData[key] = this.modelData[key]
    }
    tempData.gameId = this.model.GameId
    this.$refs['formProps'].validate((valid) => {
      alert(valid)
      if (valid) {
        this.loading2 = true
        this.$http['post']('/myGame/addProps', tempData)
          .then((response) => {
            tempData.propId = response.data.data.propId
            this.dataList.push(tempData)
            this.modelData = {}
            this.loading2 = false
            this.$alert('添加成功！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'success'
            });
          })
          .catch((response) => {
            this.loading = false
            this.$alert('添加失败！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'error'
            });
          })
        this.dialogVisible = false
      } else {
        this.$alert('请完善所有必填信息！', '温馨提示', {
          confirmButtonText: '确定',
          center: true,
          type: 'warning '
        });
      }
    })
  },
    form.methods.save = function () {
      var formData = new window.FormData();
      /*  var demoApp = document.querySelector('.demoApp .el-upload .el-upload__input' ).files[0]*/
      var Copyright = document.querySelector('.Copyright .el-upload .el-upload__input').files[0]
      var Ipis = document.querySelector('.Ipis .el-upload .el-upload__input') ?
        document.querySelector('.Ipis .el-upload .el-upload__input').files[0] : ''
      var CopyFile = document.querySelector('.CopyFile .el-upload .el-upload__input') ?
        document.querySelector('.CopyFile .el-upload .el-upload__input').files[0] : ''
      var Zzdjs = document.querySelector('.Zzdjs .el-upload .el-upload__input') ?
        document.querySelector('.Zzdjs .el-upload .el-upload__input').files[0] : ''
      var ISBN = document.querySelector('.ISBN .el-upload .el-upload__input').files[0]
      var PutFile = document.querySelector('.PutFile .el-upload .el-upload__input').files[0]
      var ApproveFile = document.querySelector('.ApproveFile .el-upload .el-upload__input').files[0]
      var ICON = document.querySelector('.ICON .el-upload .el-upload__input').files[0]
      /*var ImgLength=document.querySelector('.Img .el-upload .el-upload__input' ).files.length
      var img=[]
      for (var i = 0;i < ImgLength;i++) {
        img[i]=document.querySelector('.Img .el-upload .el-upload__input' ).files[i]
      }*/
      var img1 = document.querySelector('.img1 .el-upload .el-upload__input') ?
        document.querySelector('.img1 .el-upload .el-upload__input').files[0] : ''
      var img2 = document.querySelector('.img2 .el-upload .el-upload__input') ?
        document.querySelector('.img2 .el-upload .el-upload__input').files[0] : ''
      var img3 = document.querySelector('.img3 .el-upload .el-upload__input') ?
        document.querySelector('.img3 .el-upload .el-upload__input').files[0] : ''
      var img4 = document.querySelector('.img4 .el-upload .el-upload__input') ?
        document.querySelector('.img4 .el-upload .el-upload__input').files[0] : ''
      var img5 = document.querySelector('.img5 .el-upload .el-upload__input') ?
        document.querySelector('.img5 .el-upload .el-upload__input').files[0] : ''

      var Pad = document.querySelector('.Pad .el-upload .el-upload__input').files[0]
      /* if(demoApp){
         this.model.demoApp=demoApp;//demoApp
       }*/
      if (Copyright) {
        this.model.Copyright = Copyright;//授权书
      }
      if (Ipis) {
        this.model.Ipis = Ipis;//ip授权链文件
      }
      if (CopyFile) {
        this.model.CopyFile = CopyFile;//代理授权文件
      }
      if (Zzdjs) {
        this.model.Zzdjs = Zzdjs//软件著作权登记证书
      }
      if (ISBN) {
        this.model.ISBN = ISBN;//出版物号（ISBN）核发单
      }
      if (PutFile) {
        this.model.PutFile = PutFile;//文化部备案文件
      }
      if (ApproveFile) {
        this.model.ApproveFile = ApproveFile;//广电总局出版出版批复文件
      }
      if (ICON) {
        this.model.ICON = ICON;//游戏ICON
      }
      /*if(img[0]){
        this.model.img1=img[0];//游戏截图
      }
      if(img[1]){
        this.model.img2=img[1];//游戏截图
      }
      if(img[2]){
        this.model.img3=img[2];//游戏截图
      }
      if(img[3]){
        this.model.img4=img[3];//游戏截图
      }
      if(img[4]){
        this.model.img5=img[4];//游戏截图
      }*/
      if (img1) {
        this.model.img1 = img1;//游戏截图
      }
      if (img2) {
        this.model.img2 = img2;//游戏截图
      }
      if (img3) {
        this.model.img3 = img3;//游戏截图
      }
      if (img4) {
        this.model.img4 = img4;//游戏截图
      }
      if (img5) {
        this.model.img5 = img5;//游戏截图
      }
      if (Pad) {
        this.model.Pad = Pad;//Pad
      }
      for (var key in this.model) {
        if (key == 'gName') {
          formData.append('gameName', this.model[key])
        } else if (key == 'Sort') {
          formData.append('GameSort', this.model[key])
        } else {
          if (this.model[key]) {
            formData.append(key, this.model[key])
          }
        }
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http['post']('/myGame/upGameMsg', formData)
            .then((response) => {
              this.loading = false
              this.$alert('提交信息成功！', '温馨提示', {
                confirmButtonText: '确定',
                type: 'success'
              });
              this.reUpdate()
            })
            .catch((response) => {
              this.loading = false
              this.$alert('提交信息失败！', '温馨提示', {
                confirmButtonText: '确定',
                type: 'error'
              });
            })
        } else {
          this.$alert('请完善所有必填信息！', '温馨提示', {
            confirmButtonText: '确定',
            center: true,
            type: 'warning '
          });
        }
        this.isOk = false
      })
    }
  form.methods.clickImg = function (e) {
    //放大图片
    this.dialogImg = true
    this.showImg = true;
    // 获取当前图片地址
    if(e.isTrusted){
      this.imgSrc = e.currentTarget.src;
      this.ispdfs=0;
    }else{
      this.imgSrc = e.src;
      this.ispdfs=1;
    }
  },
    form.methods.viewImg = function () {
      this.showImg //放大图片wImg = false;
    }
  form.methods.backIt = function (val) {
    this.$router.push({name: 'gameManage', params: {status: val}});
  }
  //点击审核
  form.methods.audit = function (index, row) {
    this.gameId = this.model.GameId
    this.dialogAudit = true
  }
  //点击测试
  form.methods.test = function () {
    this.infoManage = false
    this.$router.push({name: 'gameTestInfo', params: {id: this.model.GameId, gName: this.$route.params.gName}})
  }
  //点击评级
  form.methods.lever = function () {
    this.gameId = this.model.GameId
    this.dialogLever = true
  }
  //点击下线
  form.methods.offLine = function () {
    this.gameId = this.model.GameId
    this.dialogOffLine = true
  }
  //点击下线审核
  form.methods.auditOffLine = function () {
    this.gameId = this.model.GameId
    this.dialogAuditOffLine = true
  }
  ////点击商用
  form.methods.doIt = function () {
    var gameId = this.model.GameId
    var status = 5
    this.$confirm('此操作将商用该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.loading = true
      this.$http['post']('/auditManage/gameInfoAudit', {gameId: gameId, auditStatus: status})
        .then((response) => {
          this.loading = false
          this.$alert('商用成功！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.backIt(5)
          });
        })
        .catch((response) => {
          this.$alert('商用失败！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error'
          });
          this.loading = false
        })
    })
  }
  //点击上线
  form.methods.goLine = function () {
    var gameId = this.model.GameId
    var offstatus = 1
    this.$confirm('此操作将上线该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.loading = true
      this.$http['post']('/auditManage/gameInfoAudit', {gameId: gameId, offstatus: offstatus})
        .then((response) => {
          this.loading = false
          this.$alert('上线成功！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.backIt(5)
          });
          ;
        })
        .catch((response) => {
          this.$alert('上线失败！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error'
          });
          this.loading = false
        })
    })
  }
  form.methods.success = function (res) {
    this.dialogAudit = false;
    if (res) {
      this.resStatus = res
    }
  }
  form.methods.successOff = function (res) {
    this.dialogOffLine = false;
    if (res) {
      this.resStatus = 6
    }
  }
  form.methods.successOff2 = function (res) {
    this.dialogAuditOffLine = false;
    if (res) {
      this.resStatus = res
    }
  }
  form.methods.successLever = function () {
    this.dialogLever = false;
  }
  form.methods.closeIt = function (val) {
    this.backIt(val)
  };
  export default form
</script>

<style>

  .imgStyle {
    width: 250px;
    height: 150px;
    margin-top: 6px;
  }

  .delImg {
    display: block;
  }

  .delImg:hover {
    color: #F56C6C;
    font-size: 20px;
  }

  .img {
    float: left;
    margin-left: 10px;
  }

  .spanStyle {
    color: #F56C6C;
    display: block;
  }

  .inputSpan {
    padding: 0 200px 0 200px;
    margin-top: 20px;
    font-family: "microsoft yahei", "Heiti SC", "Open Sans", sans-serif;
    font-size: 14px;
    font-weight: 700;
  }

  .inputStyle {
    margin-top: 6px;
  }

  .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    border: none;
    color: #909399;
    cursor: not-allowed;
  }

  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #ffffff;
    border: none;
    color: #909399;
    cursor: not-allowed;
  }

  .bread {
    color: #303133;
    font-weight: 700;
    background: 0 0;
    padding: 0;
  }
  .pdfstyle canvas {
    width: 250px;
    height: 150px !important;
  }
</style>
