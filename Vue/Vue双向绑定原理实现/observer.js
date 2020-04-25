
/**
 * 把一个对象的每一项都转化为可观测对象
 * @param { Object } obj 对象 
 */
function observable(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    let keys = Object.keys(obj);
    keys.forEach(key => {
        defineReactive(obj, key, obj[key])
    })
    return obj;
}



/**
 * 
 * @param { Object } obj 
 * @param { String } key 
 * @param { Any } val 
 */
function defineReactive(obj, key, val) {
    let dep = new Dep();
    Object.defineProperty(obj, key, {
        get() {
            dep.depend();
            console.log(`${obj}的${key}属性被读取了`)
            return val;
        },
        set(newValue) {
            val = newValue;
            console.log(`${obj}的${key}属性被修改了`);
            dep.notify();
        }
    })
}


class Dep {
    constructor() {
        this.subs = [];
    }
    //增加订阅者
    addSub(sub) {
        console.log(`增加订阅者${sub}`)
        this.subs.push(sub);
    }
    //判断是否增加订阅者
    depend() {
        if (Dep.target) {
            this.addSub(Dep.target);
        }
    }
    //通知订阅者更新
    notify() {
        this.subs.forEach((sub) => {
            sub.update()
        })
    }
}

Dep.target = null;