<template>
  <div class="edit-address">
    <van-address-edit
      class="edit"
      :area-list="state.areaList"
      :address-info="state.addressInfo"
      :show-delete="state.type == 'edit'"
      show-set-default
      show-search-result
      :search-result="state.searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { showToast } from 'vant'
import { addAddress, EditAddress, DeleteAddress, getAddressDetail } from '@/service/address'
import { tdist } from '@/common/js/utils'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const state = reactive({
  areaList: {
    province_list: {},
    city_list: {},
    county_list: {}
  },
  searchResult: [],
  type: 'add',
  addressId: '',
  addressInfo: {},
  from: route.query.from
})

onMounted(() =>{
  initData();
})


const initData = async () => {
  let _provice_list = {}, _city_list = {}, _county_list = {};
  tdist.getLev1().forEach(p => {
    _provice_list[p.id] = p.text;
    tdist.getLev2(p.id).forEach(c => {
      _city_list[c.id] = c.text;
      tdist.getLev3(c.id).forEach(q => _county_list[q.id] = q.text);
    })
  })
  state.areaList.province_list = _provice_list;
  state.areaList.city_list = _city_list;
  state.areaList.county_list = _county_list;
  const { addressId, type, from } = route.query;
  console.log(addressId,'htl->测试id的值')
  state.addressId = addressId;
  state.type = type;
  state.from = from || "";
  // 如果是编辑模式
  if (type === 'edit') {
    // 获取请求接口数据
    const { data: addressDetail } = await getAddressDetail(addressId);
    const province = tdist.getLev1();
    let _areaCode = "" 
    Object.entries(state.areaList.county_list).forEach(([id, text]) => {
      // 先找出当前对应的区
      if (text == addressDetail.regionName) {
        // 找到区对应的几个省份
        const provinceIndex = province.findIndex(item => item.id.substr(0, 2) == id.substr(0, 2))
        // 找到区对应的几个市区
        // eslint-disable-next-line no-unused-vars
        const cityItem = Object.entries(state.areaList.city_list).filter(([cityId, cityName]) => cityId.substr(0, 4) == id.substr(0, 4))[0]
        // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
        if (province[provinceIndex].text == addressDetail.provinceName && cityItem[1] == addressDetail.cityName) {
          _areaCode = id
        }
      }
    })
    state.addressInfo = {
      id: addressDetail.addressId,
      name: addressDetail.userName,
      tel: addressDetail.userPhone,
      province: addressDetail.provinceName,
      city: addressDetail.cityName,
      county: addressDetail.regionName,
      addressDetail: addressDetail.detailAddress,
      areaCode: _areaCode,
      isDefault: !!addressDetail.defaultFlag
    }
  }
}


const onDelete = async(id) =>{
  try{
    await DeleteAddress(state.addressId);
    showToast("删除成功")
    setTimeout(() =>{
      router.back();
    },1000);
  }catch(error){
    console.log("接口返回错误",error)
  }
}


const onSave = async(content) =>{
  const params = {
    userName: content.name,
    userPhone: content.tel,
    provinceName: content.province,
    cityName: content.city,
    regionName: content.county,
    detailAddress: content.addressDetail,
    defaultFlag: content.isDefault ? 1 : 0,
  }
  
  if(state.type === 'edit'){
    params["addressId"] = state.addressId;
  }
  try{
    await state.type === 'add' ? addAddress(params) : EditAddress(params);
    showToast("保存成功")
    setTimeout(() =>{
      router.back();
    },1000)
  }catch(error){
    console.log("接口响应有错误",error);
  }
}





</script>

<style lang="less" scoped>
</style>
