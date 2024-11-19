// 产生随机数
export const randomNum = (min:number, max:number):number => {
    return Math.floor(Math.random() * (max - min) + min)
}

// 产生随机颜色
export const randomColor = (min:number,max:number) => {
    return `rgb(${randomNum(min, max)},${randomNum(min,max)},${randomNum(min,max)})`
}