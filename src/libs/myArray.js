
//针对数组对象 根据某一列进行排序



export function arraySort(data,propertyName,sort){


    var compareUp=function(propertyName) { // 升序排序  
        if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字  
            return function(object1, object2) {  
                var value1 = object1[propertyName];  
                var value2 = object2[propertyName];  
                return value1.localeCompare(value2);  
            }  
        }  
        else {  
            return function(object1, object2) { // 属性值为数字 
               
                var value1 = object1[propertyName]; 
             
                var value2 = object2[propertyName];  
                return value1 - value2;  
            }  
        }  
    }  
    var compareDown=function(propertyName) { // 降序排序  
        if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字  
            return function(object1, object2) {  
                var value1 = object1[propertyName];  
                var value2 = object2[propertyName];  
                return value2.localeCompare(value1);  
            }  
        }  
        else {  
            return function(object1, object2) { // 属性值为数字  
                var value1 = object1[propertyName];  
                var value2 = object2[propertyName];  
                return value2 - value1;  
            }  
        }  
    }
    if(sort=="ascending" || (typeof sort)==undefined ){
         return data.sort(compareUp(propertyName));  
    }else{
        return data.sort(compareDown(propertyName));   
    }
  
}


