jQuery.noConflict();
jQuery(document).ready(function($){
    $(".edit").each((index,obj)=>{
        obj.addEventListener('click',()=>{
            let input=obj.previousElementSibling
            let input_length=input.value.length //input value length
            obj.firstChild.classList.toggle('fa-pen');
            obj.firstChild.classList.toggle('fa-check-double');
            input.toggleAttribute("readonly");
            input.setSelectionRange(input_length,input_length); //setting blinker after the last alphabet in input field
            input.focus();
            if(obj.firstChild.classList[1]==="fa-pen"){
                obj.removeAttribute('type');
                obj.setAttribute('type','submit');
            }
        })
    })
})