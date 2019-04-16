<template>
  <!--用户基本信息表单-->
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first"><router-link :to="{ path: '/channelInfoManage' }">渠道管理</router-link></span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first"><router-link :to="{ path: '/channelInfoManage' }">资质管理</router-link></span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">当前公司：{{$route.params.name || model.Companyname}}</span>
    </div>
    <!--用户基本信息表单-->
    <el-card class="box-card changeMar MyContainerCon">
      <div v-loading="loading">
        <div style="margin:6px 0 "></div>
        <div class="headDiv">
          <el-row :gutter="10" type="flex" class="row-bg" justify="center">
            <el-col :span="24">
              <div style="color: #409EFF;text-align: center;">
                <span style="font: 18px large;">资质状态：</span>
                <p :class="setTitlesCls" style="display: inline-block;">
                  <i :class="setTitlesIcon"></i>{{setTitles}}
                </p>
                <el-button class="status" v-if="buttonList.audit && status=='0'" size="mini" type="warning" @click="audit()">
                  <i class="el-icon-edit-outline"></i>审核
                </el-button>
                <el-button class="status" v-if="buttonList.offline && status=='8' &&  offstatus=='1'" size="mini" type="warning"
                           @click="offLine()">
                  <i class="fa fa-times"></i>下线
                </el-button>
                <el-button class="status" v-if="buttonList.online && offstatus=='0'" size="mini" type="success" @click="goLine()">
                  <i class="el-icon-upload"></i>上线
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="margin:6px 0 "></div>
        <el-collapse v-model="activeName" style="border-top: none;">
          <el-form ref="form" :model="model" :rules="rules" label-width="220px">
            <!--基本信息-->
            <el-collapse-item name="1">
              <template slot="title">
                <span><i class="fa fa-list-alt"></i>基本信息</span>
              </template>
              <el-row :gutter="10">
                <el-col :xs="23" :sm="{span:24}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="公司全称" prop="Companyname" :class="{'marBot':disabled}">
                    <el-input placeholder="与营业执照一致" v-model.trim="model.Companyname" :clearable="!disabled"
                              :disabled="disabled"></el-input>
                  </el-form-item>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="公司性质" prop="nature" :class="{'marBot':disabled}">
                        <el-select v-model="model.nature" placeholder="请选择" style="width: 100%" :clearable="!disabled"
                                   :disabled="disabled" :class="{'notSel': disabled }">
                          <el-option label="国有企业" value="1"></el-option>
                          <el-option label="国有控股" value="2"></el-option>
                          <el-option label="民营企业" value="3"></el-option>
                          <el-option label="外资企业" value="4"></el-option>
                          <el-option label="上市企业" value="5"></el-option>
                          <el-option label="其他" value="0"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="注册资金" prop="RegisterMoney" :class="{'marBot':disabled}">
                        <p style="padding-top:4px;color: #909399;"  v-if="disabled">
                          <span v-text="model.RegisterMoney"></span>万元
                        </p>
                        <el-input  v-if="!disabled" placeholder="请输入内容" v-model.trim="model.RegisterMoney" style="background: white;"
                                   :clearable="!disabled" :disabled="disabled">
                          <i
                            class="el-icon-edit el-mytext"
                            slot="suffix">
                          </i>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="法人姓名" prop="RegisterName" :class="{'marBot':disabled}">
                        <el-input v-model.trim="model.RegisterName" placeholder="请输入法人姓名" :clearable="!disabled"
                                  :disabled="disabled" :maxlength="6"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="法人身份证" prop="RegisterNum" :class="{'marBot':disabled}">
                        <el-input v-model.trim="model.RegisterNum" placeholder="请输入法人身份证号" :clearable="!disabled"
                                  :disabled="disabled" :maxlength="18"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="公司注册地址" prop="RegisterProvince" style="width: auto !important;" :class="{'marBot':disabled}">
                        <p style="padding-top:4px;color: #909399;"  v-if="disabled">
                          <span v-text="model.RegisterProvince"></span>省--
                          <span v-text="model.RegisterCity"></span>市
                        </p>
                        <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                          <el-select v-if="!disabled" v-model="model.RegisterProvince" placeholder="请选择省份"
                                     style="width: 100%" :clearable="!disabled" @change="getCity"
                                     :disabled="disabled" :class="{'notSel': disabled }">
                            <el-option v-for="item in provinces" :key="item.name" :label="item.name"
                                       :value="item.name"></el-option>
                          </el-select>
                        </el-col>
                        <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                          <el-select v-if="!disabled" v-model="model.RegisterCity" placeholder="请选择城市"
                                     style="width: 100%" :clearable="!disabled" :disabled="disabled"
                                     :class="{'notSel': disabled }">
                            <el-option v-for="item in citys"
                                       :key="item.name"
                                       :label="item.name"
                                       :value="item.name">
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="详细地址" prop="RegisterSite" :class="{'marBot':disabled}">
                        <el-input v-model.trim="model.RegisterSite" placeholder="与营业执照一致" :clearable="!disabled"
                                  :disabled="disabled"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="渠道资源介绍材料" class="introURL" prop="introURL" :class="{'marBot':disabled}">
                    <el-button type="primary" v-if="!disabled" icon="el-icon-download" plain @click="downloda()">模板下载</el-button>
                    <el-upload class="upload-demo"
                               action=""
                               :limit="1"
                               :on-exceed="handleExceed"
                               :auto-upload='false'
                               :on-change='getintroURL'
                               style="display:inline-block;float: left;padding-right: 10px">
                      <el-button type="primary" icon="el-icon-upload" plain
                                 v-if="!disabled" :class="disabled?'delImg':''">资料上传</el-button>
                    </el-upload>
                    <div v-if="model.introURL && isOk">
                      <a :href="model.introURL">查看渠道资源介绍材料</a>
                      <el-button type="primary" icon="el-icon-delete" plain @click="model.introURL=''"
                                 :class="disabled?'delImg':''" v-if="!disabled">删除
                      </el-button>
                      <!-- <el-button type="text" @click="model.introURL=''" v-if="!disabled">删除</el-button>-->
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <!--资质证明-->
            <el-collapse-item name="2">
              <template slot="title">
                <span><i class="fa fa-address-book-o"></i>资质证明</span>
              </template>
              <div class="spanStyle" v-if="!disabled">注：所有证件需原件彩色扫描上传或者复印件加盖公司章彩色扫描上传（不接受拍照图片），
                上传的资质证书要求为最新版本。
                公司名、法人、注册地址需一致。jpg/png/bmp/pdf格式，大小限制为5MB以内。
              </div>
              <el-row :gutter="10">
                <el-col :xs="23" :sm="{span: 24}" type="flex" class="row-bg" justify="center">
                  <el-card class="box-card elCardPad removeBorder">
                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                        <el-form-item label="法人身份证扫描件（正反面）" class="legalpersonUrl" prop="legalpersonUrl" :class="{'marBot':disabled}">
                          <el-upload class="upload-demo"
                                     action=""
                                     :limit="1"
                                     :on-exceed="handleExceed"
                                     :auto-upload='false'
                                     :on-change='legalpersonUrl'>
                            <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                       :class="disabled?'delImg':''">本地上传
                            </el-button>
                          </el-upload>
                          <div v-if="model.legalpersonUrl " style="margin-bottom: 14px;">
                            <div v-if="(model.legalpersonUrl.toString().split('.')[model.legalpersonUrl.toString().split('.').length-1])!=='pdf'">
                              <img :src="model.legalpersonUrl" alt="" class="imgStyle" style="margin: 10px 0;"
                                   @click="clickImg($event)">
                            </div>
                            <div v-if="(model.legalpersonUrl.toString().split('.')[model.legalpersonUrl.toString().split('.').length-1])=='pdf'" @click="clickImg($refs.mylegalpersonUrl)" >
                              <pdf ref='mylegalpersonUrl' :src="model.legalpersonUrl" style="margin: 10px 0;display: block; width: 250px;height: 150px" class="pdfstyle"></pdf>
                            </div>
                            <el-button type="danger" icon="el-icon-delete" plain @click="model.legalpersonUrl=''"
                                       :class="disabled?'delImg':''" v-if="!disabled">删除图片
                            </el-button>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                        <el-form-item label="开户许可证" class="licenceURL" prop="licenceURL" :class="{'marBot':disabled}">
                          <el-upload class="upload-demo"
                                     action=""
                                     :limit="1"
                                     :on-exceed="handleExceed"
                                     :auto-upload='false'
                                     :on-change='licenceURL'>
                            <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                       :class="disabled?'delImg':''">本地上传
                            </el-button>
                          </el-upload>
                          <div v-if="model.licenceURL " style="margin-bottom: 14px;">
                            <div v-if="!(model.licenceURL.toString().split('.')[model.licenceURL.toString().split('.').length-1]=='pdf')">
                              <img :src="model.licenceURL" alt="" class="imgStyle" style="margin: 10px 0;"
                                   @click="clickImg($event)">
                            </div>
                            <div v-if="(model.licenceURL.toString().split('.')[model.licenceURL.toString().split('.').length-1]=='pdf')" @click="clickImg($refs.mylicenceURL)">
                              <pdf ref='mylicenceURL' :src="model.licenceURL" style="margin: 10px 0;display: block; width: 250px;height: 150px" class="pdfstyle"></pdf>
                            </div>
                            <el-button type="danger" icon="el-icon-delete" plain @click="model.licenceURL=''"
                                       :class="disabled?'delImg':''" v-if="!disabled">删除图片
                            </el-button>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                  <hr>
                  <el-card class="box-card elCardPad removeBorder">
                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                        <el-form-item label="文网文证" class="writtenWURL" prop="writtenWURL" :class="{'marBot':disabled}">
                          <el-upload class="upload-demo"
                                     action=""
                                     :limit="1"
                                     :on-exceed="handleExceed"
                                     :auto-upload='false'
                                     :on-change='writtenWURL'>
                            <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                       :class="disabled?'delImg':''">本地上传
                            </el-button>
                          </el-upload>
                          <div v-if="model.writtenWURL " style="margin-bottom: 14px;">
                            <div v-if="!(model.writtenWURL.toString().split('.')[model.writtenWURL.toString().split('.').length-1]=='pdf')">
                              <img :src="model.writtenWURL" alt="" class="imgStyle" style="margin: 10px 0;"
                                   @click="clickImg($event)">
                            </div>
                            <div v-if="(model.writtenWURL.toString().split('.')[model.writtenWURL.toString().split('.').length-1]=='pdf')" @click="clickImg($refs.mywrittenWURL)">
                              <pdf ref='mywrittenWURL' :src="model.writtenWURL" style="margin: 10px 0;display: block; width: 250px;height: 150px" class="pdfstyle"></pdf>
                            </div>
                            <el-button type="danger" icon="el-icon-delete" plain @click="model.writtenWURL=''"
                                       :class="disabled?'delImg':''" v-if="!disabled">删除图片
                            </el-button>
                          </div>
                        </el-form-item>
                        <el-form-item label="有效期"  prop="writtenWStratTime">
                          <p style="padding-top:10px;padding-left:15px;color: #909399;"  v-if="disabled">
                            <span v-text="formatOtherDate(model.writtenWStratTime,3)"></span>&nbsp;&nbsp;&nbsp;To&nbsp;&nbsp;&nbsp;
                            <span v-text="formatOtherDate(model.writtenWEndTime,3)"></span>
                          </p>
                          <el-row :gutter="10" v-if="!disabled">
                            <el-col :span="11">
                              <div class="block">
                                <el-date-picker type="date"
                                                :disabled="disabled"
                                                placeholder="开始日期"
                                                v-model="model.writtenWStratTime"
                                                style="width:100%;"
                                                :editable="false"
                                                format="yyyy-MM-dd"
                                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                              </div>
                            </el-col>
                            <el-col :span="11">
                              <el-form-item prop="writtenWEndTime">
                                <div class="block">
                                  <el-date-picker type="date"
                                                  :disabled="disabled"
                                                  placeholder="结束日期"
                                                  v-model="model.writtenWEndTime"
                                                  style="width: 100%;"
                                                  :editable="false"
                                                  format="yyyy-MM-dd"
                                                  value-format="yyyy-MM-dd">
                                  </el-date-picker>
                                </div>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                        <el-form-item label="增值业务许可证（选填）" class="writtenURL"  :class="{'marBot':disabled}">
                          <el-upload class="upload-demo"
                                     action=""
                                     :limit="1"
                                     :on-exceed="handleExceed"
                                     :auto-upload='false'
                                     :on-change='writtenURL'>
                            <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                       :class="disabled?'delImg':''">本地上传
                            </el-button>
                          </el-upload>
                          <div v-if="model.writtenURL " style="margin-bottom: 14px;">
                            <div v-if="!(model.writtenURL.toString().split('.')[model.writtenURL.toString().split('.').length-1]=='pdf')">
                              <img :src="model.writtenURL" alt="" class="imgStyle" style="margin: 10px 0;"
                                   @click="clickImg($event)">
                            </div>
                            <div v-if="(model.writtenURL.toString().split('.')[model.writtenURL.toString().split('.').length-1]=='pdf')" @click="clickImg($refs.mywrittenURL)">
                              <pdf ref='mywrittenURL' :src="model.writtenURL" style="margin: 10px 0;display: block; width: 250px;height: 150px" class="pdfstyle"></pdf>
                            </div>
                            <el-button type="danger" icon="el-icon-delete" plain @click="model.writtenURL=''"
                                       :class="disabled?'delImg':''" v-if="!disabled">删除图片
                            </el-button>
                          </div>
                        </el-form-item>
                        <el-form-item label="有效期" prop="writtenStartTime">
                          <p style="padding-top:10px;padding-left:15px;color: #909399;"  v-if="disabled">
                            <span v-text="formatOtherDate(model.writtenStartTime,3)"></span>  To&nbsp;&nbsp;&nbsp;
                            <span v-text="formatOtherDate(model.writtenEndTime,3)"></span>
                          </p>
                          <el-row :gutter="10" v-if="!disabled">
                            <el-col :span="11">
                              <div class="block">
                                <el-date-picker type="date"
                                                :disabled="disabled"
                                                placeholder="开始日期"
                                                v-model="model.writtenStartTime"
                                                style="width: 100%;"
                                                :editable="false"
                                                format="yyyy-MM-dd"
                                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                              </div>
                            </el-col>
                            <!--<el-col class="line" :span="2">To</el-col>-->
                            <el-col :span="11">
                              <el-form-item prop="writtenEndTime">
                                <div class="block">
                                  <el-date-picker type="date"
                                                  :disabled="disabled"
                                                  placeholder="结束日期"
                                                  v-model="model.writtenEndTime"
                                                  style="width: 100%;"
                                                  :editable="false"
                                                  format="yyyy-MM-dd"
                                                  value-format="yyyy-MM-dd">
                                  </el-date-picker>
                                </div>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                  <hr>
                  <el-card class="box-card elCardPad removeBorder">
                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                        <el-form-item label="营业执照" class="businessURL" prop="businessURL" :class="{'marBot':disabled}">
                          <el-upload class="upload-demo"
                                     action=""
                                     :limit="1"
                                     :on-exceed="handleExceed"
                                     :auto-upload='false'
                                     :on-change='businessURL'>
                            <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                       :class="disabled?'delImg':''">本地上传
                            </el-button>
                          </el-upload>
                          <div v-if="model.businessURL " style="margin-bottom: 14px;">
                            <div v-if="!(model.businessURL.toString().split('.')[model.businessURL.toString().split('.').length-1]=='pdf')">
                              <img :src="model.businessURL" alt="" class="imgStyle" style="margin: 10px 0;"
                                   @click="clickImg($event)">
                            </div>
                            <div v-if="(model.businessURL.toString().split('.')[model.businessURL.toString().split('.').length-1]=='pdf')" @click="clickImg($refs.mybusinessURL)"  class="imgStyle" >
                              <pdf ref='mybusinessURL' :src="model.businessURL"></pdf>
                            </div>
                            <el-button type="danger" icon="el-icon-delete" plain @click="model.businessURL=''"
                                       :class="disabled?'delImg':''" v-if="!disabled">删除图片
                            </el-button>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">

                      </el-col>
                    </el-row>
                  </el-card>
                </el-col>
              </el-row>
            </el-collapse-item>
            <!--合同与结算信息-->
            <el-collapse-item name="3">
              <template slot="title">
                <span><i class="fa fa-clone"></i>合同与结算信息</span>
              </template>
              <el-row :gutter="10">
                <el-col :xs="23" :sm="{span: 24}" type="flex" class="row-bg" justify="center">
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="合同联系人姓名" prop="CompactManName" :class="{'marBot':disabled}">
                        <el-input v-model.trim="model.CompactManName" placeholder="姓名" :clearable="!disabled"
                                  :disabled="disabled" :maxlength="6"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="合同联系人手机" prop="CompactManPhone" :class="{'marBot':disabled}">
                        <el-input v-model.trim="model.CompactManPhone" placeholder="手机" :clearable="!disabled"
                                  :disabled="disabled" :maxlength="11"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="合同联系人邮箱" prop="CompactManEmail" :class="{'marBot':disabled}">
                        <el-input v-model.trim="model.CompactManEmail" placeholder="邮箱" :clearable="!disabled"
                                  :disabled="disabled"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="详细地址" prop="CompactAddress" :class="{'marBot':disabled}">
                        <el-input v-model.trim="model.CompactAddress" placeholder="详细地址" :clearable="!disabled"
                                  :disabled="disabled"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="结算收款银行" prop="CompactBank" :class="{'marBot':disabled}">
                        <el-input v-model.trim="model.CompactBank" placeholder="结算收款银行" :clearable="!disabled"
                                  :disabled="disabled"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="结算收款账号" prop="CompactBankNum" :class="{'marBot':disabled}">
                        <el-input v-model.trim="model.CompactBankNum" placeholder="结算收款账号" :clearable="!disabled"
                                  :disabled="disabled"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="联行行号" prop="correspondent" :class="{'marBot':disabled}">
                        <el-input v-model="model.correspondent" placeholder="联行行号" :clearable="!disabled"
                                  :disabled="disabled" :maxlength="12"></el-input>

                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <p v-if="!disabled" style="font-size:13px;color: #F56C6C;margin-top: 7px;margin-left: 30px" :class="{'marBot': !disabled }">
                        所属银行营业机构的联行代号，共12位
                      </p>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="纳税人识别号" prop="CompactTaxpayerNum" :class="{'marBot':disabled}">
                        <el-input v-model.trim="model.CompactTaxpayerNum" placeholder="由18位字符组成" :clearable="!disabled"
                                  :disabled="disabled" :maxlength="18"></el-input>
                        <p v-if="!disabled" class="spanStyle" style="margin-left: 0;">
                          请填写营业执照上的“统一社会信用代码”，共18位
                        </p>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="是否开具增值税专用发票" prop="CompactBill" :class="{'marBot':disabled}">
                        <el-select v-model="model.CompactBill" placeholder="请选择" style="width: 100%"
                                   :clearable="!disabled" :disabled="disabled"
                                   :class="{'notSel': disabled }">
                          <el-option label="否" value="0"></el-option>
                          <el-option label="是" value="1"></el-option>
                        </el-select>
                        <p v-if="!disabled" class="spanStyle" style="margin-left: 0;">
                          要求开具增值税专用发票（国税局代开亦可）
                        </p>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="纳税人类型" prop="CompactType" :class="{'marBot':disabled}">
                        <el-select v-model="model.CompactType" placeholder="请选择" style="width: 100%"
                                   :clearable="!disabled" :disabled="disabled"
                                   :class="{'notSel': disabled }">
                          <el-option label="增值税一般纳税人" value="0"></el-option>
                          <el-option label="增值税小规模纳税人" value="1"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="增值税税率（%）" prop="CompactTax" :class="{'marBot':disabled}">
                        <el-select v-model="model.CompactTax" placeholder="请选择" style="width: 100%"
                                   :clearable="!disabled" :disabled="disabled"
                                   :class="{ 'notSel': disabled }">
                          <el-option label="3" value="3"></el-option>
                          <el-option label="6" value="0"></el-option>
                          <el-option label="11" value="1"></el-option>
                          <el-option label="17" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="纳税人证明" class="CompactProveURL" prop="CompactProveURL" :class="{'marBot':disabled}">
                    <el-upload class="upload-demo"
                               action=""
                               :limit="1"
                               :on-exceed="handleExceed"
                               :auto-upload='false'
                               :on-change='CompactProveURL'>
                      <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                 :class="disabled?'delImg':''">本地上传
                      </el-button>
                    </el-upload>
                    <div v-if="model.CompactProveURL " style="margin-bottom: 14px;">
                      <div v-if="!(model.CompactProveURL.toString().split('.')[model.CompactProveURL.toString().split('.').length-1]=='pdf')">
                        <img :src="model.CompactProveURL" alt="" class="imgStyle" style="margin: 10px 0;"
                             @click="clickImg($event)">
                      </div>
                      <div v-if="(model.CompactProveURL.toString().split('.')[model.CompactProveURL.toString().split('.').length-1]=='pdf')" @click="clickImg($refs.myCompactProveURL)">
                        <pdf ref='myCompactProveURL' :src="model.businessURL" style="margin: 10px 0;display: block; width: 250px;height: 150px" class="pdfstyle"></pdf>
                      </div>
                      <el-button type="danger" icon="el-icon-delete" plain @click="model.CompactProveURL=''"
                                 :class="disabled?'delImg':''" v-if="!disabled">删除图片
                      </el-button>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <!--联系信息-->
            <el-collapse-item name="4">
              <template slot="title">
                <span><i class="fa fa-file-text-o"></i>联系信息</span>
              </template>
              <el-row  :gutter="10">
                <el-col :xs="23" :sm="{span:5}" type="flex" class="row-bg" justify="center" style="text-align: right;">
                  <el-form-item label-width="0px"  :class="{'marBot':disabled}">
                    <span style="color: #F56C6C;">*</span>
                    <span>平台联系人信息</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label-width="0" prop="BasicESBManName" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicESBManName" placeholder="姓名" :clearable="!disabled"
                              :disabled="disabled" :maxlength="6"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item  label-width="0" prop="BasicESBManPhone" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicESBManPhone" placeholder="手机" :clearable="!disabled"
                              :disabled="disabled" :maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label-width="0" prop="BasicESBManEmail" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicESBManEmail" placeholder="邮箱" :clearable="!disabled"
                              :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row  :gutter="10">
                <el-col :xs="23" :sm="{span:5}" type="flex" class="row-bg" justify="center" style="text-align: right;">
                  <el-form-item label-width="0px"  :class="{'marBot':disabled}">
                    <span style="color: #F56C6C;">*</span>
                    <span>公司负责人信息</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label-width="0" prop="BasicSeetoManName" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicSeetoManName" placeholder="姓名" :clearable="!disabled"
                              :disabled="disabled" :maxlength="6"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label-width="0" prop="BasicSeetoManPhone" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicSeetoManPhone" placeholder="手机" :clearable="!disabled"
                              :disabled="disabled" :maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label-width="0" prop="BasicSeetoManEmail" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicSeetoManEmail" placeholder="邮箱" :clearable="!disabled"
                              :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row  :gutter="10">
                <el-col :xs="23" :sm="{span:5}" type="flex" class="row-bg" justify="center" style="text-align: right;">
                  <el-form-item label-width="0px"  :class="{'marBot':disabled}">
                    <span style="color: #F56C6C;">*</span>
                    <span>业务联系人信息</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item  label-width="0" prop="BasicBnManName" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicBnManName" placeholder="姓名" :clearable="!disabled"
                              :disabled="disabled" :maxlength="6"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item  label-width="0" prop="BasicBnManPhone" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicBnManPhone" placeholder="手机" :clearable="!disabled"
                              :disabled="disabled" :maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item  label-width="0" prop="BasicBnManEmail" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicBnManEmail" placeholder="邮箱" :clearable="!disabled"
                              :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row  :gutter="10">
                <el-col :xs="23" :sm="{span:5}" type="flex" class="row-bg" justify="center" style="text-align: right;">
                  <el-form-item label-width="0px"  :class="{'marBot':disabled}">
                    <span style="color: #F56C6C;">*</span>
                    <span>结算联系人信息</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label-width="0" prop="BasicClosingManName" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicClosingManName" placeholder="姓名" :clearable="!disabled"
                              :disabled="disabled" :maxlength="6"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label-width="0" prop="BasicClosingManPhone" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicClosingManPhone" placeholder="手机" :clearable="!disabled"
                              :disabled="disabled" :maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label-width="0" prop="BasicClosingManEmail" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicClosingManEmail" placeholder="邮箱" :clearable="!disabled"
                              :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row  :gutter="10">
                <el-col :xs="23" :sm="{span:5}" type="flex" class="row-bg" justify="center" style="text-align: right;">
                  <el-form-item label-width="0px"  :class="{'marBot':disabled}">
                    <span style="color: #F56C6C;">&nbsp</span>
                    <span>&nbsp</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:18, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item  label-width="0" prop="BasicClosingManAddress" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicClosingManAddress" placeholder="详细地址" :clearable="!disabled"
                              :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row  :gutter="10">
                <el-col :xs="23" :sm="{span:5}" type="flex" class="row-bg" justify="center" style="text-align: right;">
                  <el-form-item label-width="0px"  :class="{'marBot':disabled}">
                    <span style="color: #F56C6C;">*</span>
                    <span>客服联系人信息</span>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label-width="0" prop="BasicServiceManName" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicServiceManName" placeholder="姓名" :clearable="!disabled"
                              :disabled="disabled" :maxlength="6"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label-width="0" prop="BasicServiceManPhone" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicServiceManPhone" placeholder="手机" :clearable="!disabled"
                              :disabled="disabled" :maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="23" :sm="{span:6, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label-width="0" prop="BasicServiceManEmail" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.BasicServiceManEmail" placeholder="邮箱" :clearable="!disabled"
                              :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>

            <div v-if="!isUpdate">
              <!-- 账号信息 -->
              <el-collapse-item name="5">
                <template slot="title">
                  <span><i class="fa fa-get-pocket"></i>账号信息</span>
                </template>
                <userInfo></userInfo>
              </el-collapse-item>
              <!-- 操作记录 -->
              <el-collapse-item name="6">
                <template slot="title">
                  <span><i class="el-icon-edit"></i>操作记录</span>
                </template>
                <infoOpration></infoOpration>
              </el-collapse-item>
            </div>
          </el-form>
        </el-collapse>
        <el-dialog class="MyModelremove" :visible.sync="dialogAudit" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
          <channelInfoAudit v-bind:dialogAudit = "dialogAudit"
                            v-bind:customerId="customerId"
                            v-on:success="success()">
          </channelInfoAudit>
        </el-dialog>
        <el-dialog class="MyModelremove" :visible.sync="dialogOffLine" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
          <channelInfoOffline v-bind:dialogOffLine = "dialogOffLine"
                              v-bind:customerId="customerId"
                              v-on:successOff="successOff()">
          </channelInfoOffline>
        </el-dialog>
        <div style="margin:10px 0 "></div>
        <div style="text-align: center" v-if="isUpdate">
          <el-button type="primary" icon="el-icon-success" v-on:click="commitInfo()">提交信息</el-button>
          <el-button type="info" icon="el-icon-error" v-on:click="reset();reUpdate()">取消修改</el-button>
        </div>
      </div>
    </el-card>
    <!--放大图片-->
    <el-dialog title="" :visible.sync="dialogImg" modal class="allIMg">
      <img :src="imgSrc"  class="lookImg" v-if="!ispdfs">
      <pdf :src="imgSrc"  class="lookImg" v-if="ispdfs"></pdf>
    </el-dialog>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'
  import axios from 'axios'
  import arrCity from '../../common/store/arrCity'
  import Form from '../../common/form'
  import infoOpration from '../commonVue/infoOpration.vue'
  import userInfo from '../commonVue/userInfo.vue'
  import channelInfoAudit from './channelInfoAudit.vue'
  import channelInfoOffline from './channelInfoOffline.vue'
  import customer from '../../common/store/customer'
  var reg =require('../../common/commonMethods.js')

  var form = new Form({store: customer});
  form.components = {
    'infoOpration': infoOpration,
    'userInfo':userInfo,
    'channelInfoAudit':channelInfoAudit,
    'channelInfoOffline':channelInfoOffline,
    pdf
  }
  var model=function () {
    return{
      type:1,customerId:'',
      Companyname :'', nature :'', RegisterMoney:'', RegisterName: '',
      RegisterNum:'', RegisterProvince: '', RegisterCity: '', RegisterSite:'',channelIntro:'',introURL:'',

      ThreeType:1,legalpersonUrl :'',licenceURL:'',
      /*licenceStarTime:'',licenceEndTime:'',*/businessURL:'',
      writtenWStratTime:'',writtenWEndTime:'',writtenWURL:'',
      writtenStartTime:'',writtenEndTime:'',writtenURL:'',

      CompactManName:'', CompactManPhone:'', CompactManEmail:'', CompactAddress:'',
      CompactBank:'',CompactBankNum:'',CompactTaxpayerNum:'',CompactBill:'', CompactType:'',CompactTax:'',CompactProveURL:'',
      correspondent:'',

      BasicESBManName:'', BasicESBManPhone:'', BasicESBManEmail:'',
      BasicSeetoManName:'', BasicSeetoManPhone:'', BasicSeetoManEmail:'',
      BasicBnManName:'', BasicBnManPhone:'', BasicBnManEmail:'',
      BasicClosingManName:'', BasicClosingManPhone:'', BasicClosingManEmail:'', BasicClosingManAddress:'',
      BasicServiceManName:'', BasicServiceManPhone:'', BasicServiceManEmail:'',
    }
  }
  form.watch= {
    dialogOffLine(val){
      if(val){
        $('.MyContainerCon').css('position','static');
      }else{
        $('.MyContainerCon').css('position','absolute');
      }
    },
    dialogAudit(val){
      if(val){
        $('.MyContainerCon').css('position','static');
      }else{
        $('.MyContainerCon').css('position','absolute');
      }
    }
  },
  form.data=function () {
    return {
      loading:false,
      dialogImg:false,
      showImg:false,
      imgSrc: '',ispdfs:0,
      activeName: ['1','2','3','4','5','6'],
      isUpdate:false,
      isOk:false,
      provinces:[],
      citys:[],
      disabled:true,
      model: model(),
      origModel:model(),

      dialogAudit:false,
      dialogOffLine:false,
      customerId:'',

      setTitles:'',
      setTitlesCls: '',
      setTitlesIcon: '',
      status:'',
      offstatus:'',

      buttonList:{
        search:false,
        audit:false,
        view:false,
        offline:false,
        export:false,
        online:false,
      },

      rules: {
        Companyname:[{ required: true, message: '请输入公司全称', trigger: 'blur' }],
        nature : [{ required: true, message: '请选择公司性质', trigger: 'change' }],
        RegisterMoney:  [{required: true, validator: reg.RegisterMoney, trigger: 'blur' }],
        RegisterName: [{required: true, validator: reg.RegisterName,trigger: 'blur'}],

        RegisterNum: [{required: true, validator: reg.RegisterNum, trigger: 'blur' }],

        RegisterProvince: [{ required: true, message: '请选择省份', trigger: 'change' }],
        RegisterCity: [{ required: true, message: '请选择市', trigger: 'change' }],
        RegisterSite:[{ required: true, message: '请选择公司注册地址',trigger: 'blur'},],

        channelIntro:[{ required: true, message: '请输入渠道资料介绍', trigger: 'blur' },
          { min: 1, max:500, message: '长度在 500字以内', trigger: 'blur' }],
        introURL: [{ required: true, message: '请上传渠道介绍资料', trigger: 'blur' }],
        legalpersonUrl : [{ required: true, message: '请上传法人身份证扫描件', trigger: 'blur' }],
        licenceURL: [{ required: true, message: '请上开户许可证扫描件', trigger: 'blur' }],
       /* licenceStarTime: [{ required: true, message: '请选择时间', trigger: 'change' }],
        licenceEndTime: [{ required: true, message: '请选择时间', trigger: 'change' },
          { required: true, validator:this.licenceTime, trigger: 'blur' }],*/
        businessURL: [{ required: true, message: '请上传营业执照扫描件', trigger: 'blur' }],

        writtenWStratTime: [{ required: true, message: '请选择时间', trigger: 'change' }],
        writtenWEndTime:  [{ required: true, message: '请选择时间', trigger: 'change' },
          { required: true, validator:this.writtenWTime, trigger: 'blur' }],
        writtenWURL: [{ required: true, message: '请上传文网文证扫描件', trigger: 'blur' }],

        CompactManName:[{required: true, validator: reg.RegisterName,trigger: 'blur'},],
        CompactManPhone:[{required: true, validator: reg.RegisterPhone,trigger: 'blur'},],
        CompactManEmail:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger:'blur'  }],
        CompactAddress: [{required: true, message: '请输入地址',trigger: 'blur'}],
        CompactBank: [{required: true, message: '请输入银行名称',trigger: 'blur'}],
        CompactBankNum:[{required: true, validator: reg.RegisterBank,trigger: 'blur'},],
        CompactTaxpayerNum:[
          { required: true, message: '请输入纳税人识别号', trigger: 'blur' },
          { min: 18, max: 18, message: '纳税人识别号为18位字符', trigger: 'blur' }
        ],
        correspondent: [{required: true,validator: reg.RegisterNums, trigger: 'blur'},],
        CompactBill: [{ required: true, message: '请选择是否开票', trigger: 'change' }],
        CompactType: [{ required: true, message: '请选择纳税人类型', trigger: 'change' }],
        CompactTax: [{ required: true, message: '请选择增值税税率', trigger: 'change' }],
        CompactProveURL: [{required: true, message: '请上传纳税人证明扫描件', trigger: 'blur' }],

        BasicESBManName:[{required: true, validator: reg.RegisterName,trigger: 'blur'},],
        BasicESBManPhone:[{required: true, validator: reg.RegisterPhone,trigger: 'blur'},],
        BasicESBManEmail:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'  }],
        BasicSeetoManName:[{required: true, validator: reg.RegisterName,trigger: 'blur'},],
        BasicSeetoManPhone:[{required: true, validator: reg.RegisterPhone,trigger: 'blur'},],
        BasicSeetoManEmail:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
        BasicBnManName:[{required: true, validator: reg.RegisterName,trigger: 'blur'},],
        BasicBnManPhone:[{required: true, validator: reg.RegisterPhone,trigger: 'blur'},],
        BasicBnManEmail:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger:'blur'  }],
        BasicClosingManName:[{required: true, validator: reg.RegisterName,trigger: 'blur'},],
        BasicClosingManPhone:[{required: true, validator: reg.RegisterPhone,trigger: 'blur'},],
        BasicClosingManEmail:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'  }],
        BasicClosingManAddress: [{required: true, message: '请输入地址',trigger: 'blur'}],
        BasicServiceManName:[{required: true, validator: reg.RegisterName,trigger: 'blur'}],
        BasicServiceManPhone:[{required: true, validator: reg.RegisterPhone,trigger: 'blur'}],
        BasicServiceManEmail:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'  }],
      }

    }
  }
  form.mounted=function () {
    this.getInfo()
    this.getProvinces()
    this.getAction()
    this.setTitle()
    this.initButton(4,8)
  }
  //判断是查看还是修改
  form.methods.getAction=function () {
    if(this.$route.params.action=="update"){
      this.isUpdate=true;
      this.disabled=false;
      this.activeName= ['1','2','3','4','5']
    }
  }
  //根据ID查询
  form.methods.getInfo=function (){
    this.loading=true;
    var id=this.$route.params.id
    axios['post']('/channelInfo/getChannelInfo',{customerId:id})
      .then((response) => {
        for(var key in response.data.data){
          if(response.data.data[key]==="0000-00-00 00:00:00"){
            this.model[key]=''
          }
          else{
            this.model[key]=response.data.data[key]
          }
        }
        this.isOk=true
        this.origModel = _.clone(this.model)
        this.loading=false
      })
      .catch((response) => {
        this.loading=false

      })
  }
  form.methods.getProvinces=function () {
    this.provinces = arrCity.data
  }
  form.methods.getCity=function () {
    this.model.RegisterCity = ''
    for (var i = 0; i < this.provinces.length; i++) {
      if (this.provinces[i].name == this.model.RegisterProvince) {
        this.citys=this.provinces[i].sub
      }
    }
  }
  //获取状态
  form.methods.getStatus=function () {
    this.loading=true;
    var customerId=this.$route.params.id;
    var type='1';
    var typeObj={id:customerId,type:type}
    this.$http['post']('/joinup/getStatusByType',{typeObj:typeObj})
      .then((response) => {
        this.status=response.data.data[0].status
        this.offstatus=response.data.data[0].offstatus
        this.settitle()
        this.loading=false

      })
      .catch((response) => {
        this.loading=false
      })
  }
  //设置状态
  form.methods.setTitle=function () {
    if(this.$route.params.status=="0" || this.$route.params.status){
      this.status=this.$route.params.status
      this.offstatus=this.$route.params.offstatus
      this.settitle()
    }else{
      this.getStatus()
    }

  }
  form.methods.settitle=function () {
    if(this.status=="0"){
      this.setTitles='待审核'
      this.setTitlesCls ='await'
      this.setTitlesIcon = 'el-icon-edit-outline'
    }
    if(this.status=="8"){
      this.setTitles='审核通过'
      this.setTitlesCls ='finish-pass'
      this.setTitlesIcon = 'fa fa-check'
    }
    if(this.status!="8" && this.status!="0"){
      this.setTitles='审核不通过'
      this.setTitlesCls ='no-pass'
      this.setTitlesIcon = 'fa fa-times'
    }
    if(this.offstatus=="0"){
      this.setTitles='已下线'
      this.setTitlesCls ='no-pass'
      this.setTitlesIcon = 'fa fa-times'
    }
  }
  /*form.methods.licenceTime=function (start,end,callback) {
    start=this.model.licenceStarTime
    end=this.model.licenceEndTime
    this.vailDate(start,end,callback)
  }*/
  form.methods.writtenWTime=function (start,end,callback) {
    start=this.model.writtenWStratTime
    end=this.model.writtenWEndTime
    this.vailDate(start,end,callback)
  }
  form.methods.writtenTime=function (start,end,callback) {
    start=this.model.writtenStartTime
    end=this.model.writtenEndTime
    this.vailDate(start,end,callback)
  }
  //日期验证（开始日期小于结束日期）
  form.methods.vailDate=function (start,end,callback) {
    var dateIsOk=reg.dateIsOk(start,end)
    var endit=end
    if(!dateIsOk){
      this.$alert('截止日期不能小于开始日期!', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      }).then(() => {
        callback(new Error('请输入正确的日期'));
      })
    }else{
      callback()
    }

  }
 /* //点击修改资料
  form.methods.updateInfo=function (){
    this.isUpdate=true;
    this.disabled=false;
    this.activeName= ['1','2','3','4']
  }*/
  //点击取消修改
  form.methods.reUpdate=function (){
    this.isUpdate=false;
    this.disabled=true;
    this.activeName= ['5','6']
  }
  //只能上传word文件.doc .docx
  form.methods.limitFile=function (file,fileList,size) {
    var fileType=file.raw.type
    if(fileType!=='application/msword' && fileType!=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
      this.$alert('上传文件仅支持word文档格式！', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      });
      fileList.shift()
    }else{
      return fileList
    }
  },
    form.methods.limitIMG=function (file,fileList,size) {
      var imgType=file.raw.type
      var imgSize=Math.floor(file.raw.size );
      if(imgType!=='image/jpeg' && imgType!=='image/png' && imgType!=='image/bmp' && imgType !== 'application/pdf'){
        this.$alert('上传文件仅支持jpg/png/bmp/pdf格式！', '温馨提示', {
          confirmButtonText: '确定',
          center: true,
          type: 'warning'
        });
        fileList.shift()
      }else if(imgSize>size*1024*1024){
        this.$alert('上传图片大小不能超过'+size+'MB!', '温馨提示', {
          confirmButtonText: '确定',
          center: true,
          type: 'warning'
        });
        fileList.shift()
      }else{
        return fileList
      }
    },
    form.methods.getintroURL=function (file,fileList){
      this.limitFile(file, fileList)
    }
  form.methods.legalpersonUrl=function (file,fileList){
    if(this.limitIMG(file, fileList,1)) {
      this.changeUpload(file, fileList, 'legalpersonUrl')
    }
  }
  form.methods.licenceURL=function (file,fileList){
    if(this.limitIMG(file, fileList,1)) {
      this.changeUpload(file, fileList, 'licenceURL')
    }
  }
  form.methods.businessURL=function (file,fileList){
    if(this.limitIMG(file, fileList,1)) {
      this.changeUpload(file, fileList, 'businessURL')
    }
  }
  form.methods.writtenWURL=function (file,fileList){
    if(this.limitIMG(file, fileList,1)) {
      this.changeUpload(file, fileList, 'writtenWURL')
    }
  }
  form.methods.writtenURL=function (file,fileList){
    if(this.limitIMG(file, fileList,1)) {
      this.changeUpload(file, fileList, 'writtenURL')
    }
  }
  form.methods.CompactProveURL=function (file,fileList){
    if(this.limitIMG(file, fileList,1)) {
      this.changeUpload(file, fileList, 'CompactProveURL')
    }
  }
  //上传预览
  form.methods.changeUpload = function(file, fileList,className) {
    var fileType = file.raw.type
    if(fileType=='application/pdf'){
      return
    }else {
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
  },
    /* form.methods.changeUpload=function(file, fileList,index) {
       var fileLists = fileList;
       this.$nextTick(
         () => {
           let upload_list_li = document.getElementsByClassName('el-upload-list')[index].children;
           for (let i = 0; i < upload_list_li.length; i++) {
             let li_a = upload_list_li[i];
             //li样式
             li_a.setAttribute('style', "width: 250px;height: 150px;margin:10px;float:left;");
             let imgElement = document.createElement("img");
             imgElement.setAttribute('src', fileLists[i].url);
             //img样式
             imgElement.setAttribute('style', "width: 250px;height: 150px;");
             if (li_a.lastElementChild.nodeName !== 'IMG') {
               li_a.appendChild(imgElement);
             }
           }
         });
     }*/
    //上传提醒每次只能上传一张图片
    form.methods.handleExceed=function(files, fileList) {
      //this.$message.warning(`请选择 1 个文件进行上传！`);
      this.$alert('每次请选择 1 个文件进行上传！', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      });

    }
  //提交信息
  form.methods.commitInfo=function(){
    this.model.type=1;
    this.saveIt()
  },
    form.methods.saveIt=function(){
      var formData = new window.FormData();
      var introURL = document.querySelector('.introURL .el-upload .el-upload__input' ).files[0]
      var legalpersonUrl = document.querySelector('.legalpersonUrl .el-upload .el-upload__input' ).files[0]
      var licenceURL = document.querySelector('.licenceURL .el-upload .el-upload__input' ).files[0]
      var businessURL = document.querySelector('.businessURL .el-upload .el-upload__input' ).files[0]
      var writtenWURL = document.querySelector('.writtenWURL .el-upload .el-upload__input' ).files[0]
      var writtenURL = document.querySelector('.writtenURL .el-upload .el-upload__input' ).files[0]
      var CompactProveURL = document.querySelector('.CompactProveURL .el-upload .el-upload__input' ).files[0]
      if(introURL){
        this.model.introURL=introURL;//渠道资料介绍
      }
      if(legalpersonUrl){
        this.model.legalpersonUrl=legalpersonUrl;//法人身份证
      }
      if(licenceURL){
        this.model.licenceURL=licenceURL;//开户许可证
      }
      if(businessURL){
        this.model.businessURL=businessURL//营业执照
      }
      if(writtenWURL){
        this.model.writtenWURL=writtenWURL;//文网文证图片地址
      }
      if(writtenURL){
        this.model.writtenURL=writtenURL;//增值业务许可证照片地址
      }
      if(CompactProveURL){
        this.model.CompactProveURL=CompactProveURL;//纳税人地址
      }
      this.model.customerId=this.$route.params.id
      for(var key in this.model){
        if(this.model[key]){
          formData.append(key, this.model[key])
        }
      }
      console.log(formData.customerId)
      console.log(formData)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading=true
          this.$http.post('/channelInfo/channelUpload', formData)
            .then((response) => {
              this.loading = false
              this.$alert('提交信息成功！', '温馨提示', {
                confirmButtonText: '确定',
                type: 'success'
              }).then(() => {
               // this.back()
                /*this.$router.push({name:'myChannelInfo',params:{data:{goadd:'channel_operation',status:1}}})*/
              })

            })
            .catch((response) => {
              this.loading=false
              this.$alert('提交信息失败！', '温馨提示', {
                confirmButtonText: '确定',
                type: 'error'
              });
              this.isOk=false
            })
        }else{
          this.$alert('请完善所有必填信息！', '温馨提示', {
            confirmButtonText: '确定',
            center: true,
            type: 'warning '
          });
          this.isOk=false
        }
      })
    }
    form.methods.clickImg=function(e) {
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
    }
    form.methods.viewImg=function() {
      this.showImg = false;
    }
  form.methods.backIt=function () {
    this.$router.push({name:'channelInfoManage'});
  }
  //点击审核
  form.methods.audit=function (){
    this.customerId=this.model.customerId
    this.dialogAudit=true
  }
  form.methods.success=function (){
    this.dialogAudit = false;
    this.backIt()
  }
  //点击下线
  form.methods.offLine=function (){
    this.customerId=this.model.customerId
    this.dialogOffLine=true
  }
  form.methods.successOff=function (){
    this.dialogOffLine = false;
    this.backIt()
  }
  form.methods.closeIt=function () {
    this.backIt()
  };
  //点击上线
  form.methods.goLine=function (index, row) {
    var customerId = this.model.customerId
    var offstatus = 1
    this.$confirm('此操作将上线该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.loading = true
      this.$http['post']('/auditManage/infoAudit', {customerId: customerId, offstatus: offstatus})
        .then((response) => {
          this.loading = false
          this.$alert('上线成功！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.backIt()
          });
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
  export default form
</script>

<style>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .imgStyle{
    width:250px;
    height:150px;
    margin-top: 6px;
    display:block;
  }
  .delImg{
    display: block;
  }
  .delImg:hover{
    color: #F56C6C;
    font-size: 20px;
  }
  .secondTabs{
    color: #409EFF;
    font: 18px large;
  }
  .el-input.is-disabled .el-input__inner{
    background-color:#ffffff;
    border:none;
    color: #909399;
    cursor: not-allowed;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #ffffff;
    border:none;
    color: #909399;
    cursor: not-allowed;
  }
  .el-button.el-button--default.is-disabled{
    background-color: #ffffff;
    color: #909399;
    cursor: not-allowed;
    border:none;
  }
  .el-input-group__append{
    border:none;
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


