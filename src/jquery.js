window.jQuery = function(selectorOrArray){
    let elements
    if(typeof selectorOrArray === 'string'){
        elements = document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
    return{
        preApi: selectorOrArray.preApi,
        // test(){
        //     console.log(this.preApi)
        // },
        find(selector){
            let array = []
            for(let i = 0; i < elements.length; i++){
                const temp = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(temp)
            }
            array.preApi = this
            //array.preApi = 1
            // console.log(array)
            return jQuery(array)
        },
        each(fn){
            for(let i = 0; i < elements.length; i++){
                fn.call(null, elements[i], i)
            }
            return this
        },
        parent(){
            const parentList = []
            this.each((node)=>{
                if(parentList.indexOf(node.parentNode) === -1){
                    parentList.push(node.parentNode)
                }
            })
            return jQuery(parentList)
        },
        children(){
            const childrenList = []
            this.each((node)=>{
                childrenList.push(...node.children)
            })
            return jQuery(childrenList)
        },
        siblings(){
            const siblingsList = []
            siblingsList.push(...this.parentNode.children)
            siblingsList.filter(n=>n!==this)
            return jQuery(siblingsList)
        },
        print(){
            console.log(elements)
        },
        addClass(className){
            for(let i=0; i < elements.length; i++){
                const element = elements[i]
                element.classList.add(className)
            }
            return this
        },
        end(){
            return this.preApi
        },
    }
}