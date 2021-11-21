export const capitalize = (str) => {
    return str.substring(0,1).toUpperCase() + str.substring(1);
}

//Not for hex colors
export const darken = (color) => {
    const arr = color.split(/[()]+/);
    const numbers = arr[1].split(",");
    const darkerArr = [];
    for(let i = 0; i < 3; i++) {
        if(numbers[i] < 100) {
            darkerArr.push(0);
        } else {
            darkerArr.push(numbers[i] - 100);
        }
    }
    
    return "rgba(" + darkerArr[0] + "," + darkerArr[1] + "," + darkerArr[2] + ")"
}

//Only for hex colors
export const lighten = (color) => {
    const arr = color.split(/[()]+/);
    const numbers = arr[1].split(",");
    const lighterArr = [];
    for(let i = 0; i < 3; i++) {
        if(numbers[i] > 235) {
            lighterArr.push(255);
        } else {
            lighterArr.push(numbers[i] + 20);
        }
    }
    
    return "rgba(" + lighterArr[0] + "," + lighterArr[1] + "," + lighterArr[2] + ")"
}