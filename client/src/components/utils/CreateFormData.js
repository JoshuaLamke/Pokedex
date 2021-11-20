import * as yup from 'yup';
import { validateImage } from "image-validator";


const numberCheck = (val) => {
    if(val === null || val === undefined || val === "") {
        return true;
    } else if(val.trim() === "") {
        return false;
    } else if(isNaN(val)) {
        return false;
    } else {
        return true;
    }
}

const isInteger = (val) => {
    if(val === null || val === undefined || val === "") {
        return true;
    } else if(val % 1 !== 0) {
        return false;
    } else {
        return true;
    }
}

const numRangeCheck = (val) => {
    if(val === null || val === undefined || val === "") {
        return true;
    } else if(isNaN(val)) {
        return false;
    } else if(val <= 200 && val >= 0) {
        return true;
    } else {
        return false;
    }
}

export const FormData = yup
.object({
    name: yup.string().test("valid-name", "Must Have Name", (name) => {
        if(name === undefined || name === null || name === "") {
            return true;
        } else if (name.trim() === "") {
            return false;
        } else {
            return true;
        }
    }).test("valid-name-2", "Must Be 2-12 Characters", (name) => {
        if(name === undefined || name === null || name === "") {
            return true;
        }
        else if(name.trim().length > 1 && name.trim().length < 13) {
            return true;
        } else {
            return false;
        }
    }).default(""),
    desc: yup.string().test("valid-description", "Must Have Description", function(desc) {
        if(desc === undefined || desc === null || desc === "") {
            return true;
        } else if (desc.trim() === "") {
            return false;
        } else {
            if(desc === undefined || desc === null || desc === "") {
                return true;
            }
            else if(desc.trim().length > 1) {
                return true;
            } else {
                return false;
            }
        }
    }).default(""),
    HP: yup.mixed().test("valid-hp", "HP must be number", (val) => numberCheck(val)).test("valid-hp-2", "HP must be 0-200", (val) => numRangeCheck(val)).test("whole-number", "Must be whole number", (val) => isInteger(val)).default(""),
    Atk: yup.mixed().test("valid-atk", "Atk must be number", (val) => numberCheck(val)).test("valid-atk-2", "Atk must be 0-200", (val) => numRangeCheck(val)).test("whole-number", "Must be whole number", (val) => isInteger(val)).default(""),
    Def: yup.mixed().test("valid-def", "Def must be number", (val) => numberCheck(val)).test("valid-def-2", "Def must be 0-200", (val) => numRangeCheck(val)).test("whole-number", "Must be whole number", (val) => isInteger(val)).default(""),
    SP_Atk: yup.mixed().test("valid-sp_atk", "SP_Atk must be number", (val) => numberCheck(val)).test("valid-sp_atk-2", "SP_Atk must be 0-200", (val) => numRangeCheck(val)).test("whole-number", "Must be whole number", (val) => isInteger(val)).default(""),
    SP_Def: yup.mixed().test("valid-sp_def", "SP_Def must be number", (val) => numberCheck(val)).test("valid-sp_def-2", "SP_Def must be 0-200", (val) => numRangeCheck(val)).test("whole-number", "Must be whole number", (val) => isInteger(val)).default(""),
    Speed: yup.mixed().test("valid-speed", "Speed must be number", (val) => numberCheck(val)).test("valid-speed-2", "Speed must be 0-200", (val) => numRangeCheck(val)).test("whole-number", "Must be whole number", (val) => isInteger(val)).default(""),
    ability: yup.string().test("valid-ability", "Ability Cant Be Empty", (hidden_ability) => {
        if(hidden_ability === undefined || hidden_ability === null || hidden_ability === "") {
            return true;
        } else if (hidden_ability.trim() === "") {
            return false;
        } else {
            return true
        }
    }).test("valid-ability-2", "Must Be 2-20 Characters", (hidden_ability) => {
        if(hidden_ability === undefined || hidden_ability === null || hidden_ability === "") {
            return true;
        } else if(hidden_ability.trim().length < 21 && hidden_ability.trim().length > 1) {
            return true;
        } else {
            return false;
        }
    }).default(""),
    hidden_ability: yup.string().test("valid-hidden-ability", "Ability Cant Be Empty", (hidden_ability) => {
        if(hidden_ability === undefined || hidden_ability === null || hidden_ability === "") {
            return true;
        } else if (hidden_ability.trim() === "") {
            return false;
        } else {
            return true
        }
    }).test("valid-hidden-ability-2", "Must Be 2-20 Characters", (hidden_ability) => {
        if(hidden_ability === undefined || hidden_ability === null || hidden_ability === "") {
            return true;
        }else if(hidden_ability.trim().length < 21 && hidden_ability.trim().length > 1) {
            return true;
        } else {
            return false;
        }
    }).default(""),
    image: yup.string().test("valid-image", "Image Must Be Valid", async (image) => {
        if(image === undefined || image === null || image === "") {
            return true;
        } else if (image.trim() === "") {
            return false;
        } else {
            return await validateImage(image);
        }
    }).default("")
})