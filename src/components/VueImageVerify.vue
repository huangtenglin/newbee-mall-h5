<template>
    <canvas @click="drawImage()" :width="canvasData.width" :height="canvasData.height" ref="canvas"></canvas>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { randomNum, randomColor} from '@/utils/index.ts'
let canvas:any = ref();
interface CanvasData {
    width: number,
    height: number,
    pool: string,
    imgCode: string
}
const canvasData = reactive<CanvasData>({
    width: 120,
    height: 40,
    pool: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    imgCode: ""
})

onMounted(() =>{
    canvasData.imgCode = drawImage() as string;
})

defineExpose({
    imgCode: canvasData.imgCode
})
const drawImage = ():string|void =>{
    let ctx = canvas.value!.getContext("2d");
    if(!ctx) return ("您当前的浏览器暂不支持canvans");
     // 填充颜色
    ctx.fillStyle = randomColor(180, 230)
    // 渲染到浏览器
    ctx.fillRect(0,0,canvasData.width,canvasData.height);
     // 定义paramText
     let imgCode = ''
     for(let i = 0; i < 4; i++){
        const text = canvasData.pool[randomNum(0, canvasData.pool.length)] // 获取字体
        imgCode += text // 拼接字体
        // 定义字体大小
        let fontSize = randomNum(18, 40);
        let deg = randomNum(-30,30);
        ctx.font = fontSize + 'px Simhei'
        ctx.textBaseline = 'top'
        ctx.fillStyle = randomColor(80, 150)
        ctx.save(); // 保存整个状态
        ctx.translate(30 * i + 15, 15)
        ctx.rotate((deg * Math.PI) / 180)
        ctx.fillText(text, -15 + 5, -15)
        ctx.restore()
     }
     /*
      * 绘制文字并让四个文字在不同的位置显示的思路 :
      * 1、定义字体
      * 2、定义对齐方式
      * 3、填充不同的颜色
      * 4、保存当前的状态（以防止以上的状态受影响）
      * 5、平移translate()
      * 6、旋转 rotate()
      * 7、填充文字
      * 8、restore出栈
      * */


    // 5：绘制4条随机颜色
    for(let i = 0; i < 4; i++){
        ctx.beginPath();
        ctx.moveTo(randomNum(0,canvasData.width),randomNum(0,canvasData.height));
        ctx.lineTo(randomNum(0,canvasData.width),randomNum(0,canvasData.height));
        ctx.strokeStyle = randomColor(0,255);
        ctx.closePath();
        ctx.stroke();
    }
    // 6.随机产生40个干扰的小点
    for(let i = 0; i < 40; i++){
        ctx.beginPath();
        ctx.arc(randomNum(0, canvasData.width), randomNum(0, canvasData.height), 1, 0, 2 * Math.PI);
        ctx.fillStyle = randomColor(150,200)
        ctx.fill();
        ctx.closePath();
    }
    canvasData.imgCode = imgCode
    localStorage.setItem("imgCode",imgCode)
    return imgCode;
}



</script>


<style lang='less' scoped>

</style>