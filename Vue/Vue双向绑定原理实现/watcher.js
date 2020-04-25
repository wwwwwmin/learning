class Watcher {
    /**
     * vm 是一个myVue实例
     * exp 是name
     * cb 更新视图函数
     */
    constructor(vm, exp, cb) {
        console.log('俺是一个watcher实例')
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;
        this.value = this.get();
    }
    get() {
        Dep.target = this;    //缓存自己
        let value = this.vm.data[this.exp]; //触发dep中的depend()
        Dep.target = null;   //释放自己，避免再次被push到dep.subs中
        return value;
    }

    update() {
        let value = this.vm.data[this.exp];
        let oldVal = this.value;
        console.log(this.cb);
        if(value !== oldVal){
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
			}
        }
    }




