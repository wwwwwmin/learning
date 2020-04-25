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
        Dep.target = this;
        let value = this.vm.data[this.exp];
        Dep.target = null;
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




