document.addEventListener("DOMContentLoaded",function(){
    const dataform=document.querySelector("#dataform");
    const datainput=document.querySelector("#datainput");
    const datalist=document.querySelector("#datalist");

    loadStoedData();

dataform.addEventListener("submit",function(e){
    e.preventDefault();
    const data=datainput.value.trim();
    if(data!== ""){
        addtoLocalStorage(data);
        loadStoedData();
        datainput.value="";
    }else{
        alert("Please Enter Data")
        datainput.focus();
    }
});

//Add new Data to localStorage
    function addtoLocalStorage(data){
        const stoedData=JSON.parse(localStorage.getItem("myData")) || [];
        stoedData.push(data);
        localStorage.setItem("myData",JSON.stringify(stoedData));
    }

//load all data from Local Storage
    function loadStoedData(){
        const stoedData=JSON.parse(localStorage.getItem("myData")) || [];
        datalist.innerHTML="";
        stoedData.forEach((data,index)=> {
            let output=`
                <li>
                    ${data}
                    <div>
                        <button class="btnEdit" data-index='${index}'>Edit</Button>
                        <button class="btnDelete" data-index='${index}'>Delete</Button>
                    </div>
                </li>
            `;
            datalist.innerHTML+=output;
        });
        const dltButton=document.querySelectorAll(".btnDelete");
        dltButton.forEach((btn)=>{
            btn.addEventListener("click",deleteData);
        });
        const edit=document.querySelectorAll(".btnEdit");
        dltButton.forEach((btn)=>{
            btn.addEventListener("click",editData);
        });
    }

    //To data a User from Local Storage
    function deleteData(){
        const index=this.dataset.index;
        const stoedData=JSON.parse(localStorage.getItem("myData")) || [];
        stoedData.splice(index, 1);
        localStorage.setItem("myData",JSON.stringify(stoedData));
        loadStoedData();
    }

    //To Modify User Data
    function editData(){
        const index=this.dataset.index;
        const stoedData=JSON.parse(localStorage.getItem("myData")) || [];
        const newData=prompt("Edit Data",stoedData[index]);
        if(newData!== null){
            stoedData[index]=newData.trim();
            localStorage.setItem("myData",JSON.stringify(stoedData));
            loadStoedData();
        }
    }
})