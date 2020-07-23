class DropBoxControlle{
    constructor(){
        this.btnSendFile = document.querySelector('#btn-send-file');
        this.inputFile = document.querySelector('#files');
        this.snackModal = document.querySelector('#react-snackbar-root');
        this.progressBar = document.querySelector('.mc-progress-bar-fg');
        this.filename = document.querySelector('.filename');
        this.timeLeft = document.querySelector('.timeleft');
        this.initEvents();


    }
    initEvents(){
        this.btnSendFile.addEventListener('click',()=> this.inputFile.click());

        this.inputFile.addEventListener('change', (event) => {
     
            this.uploadTask(event.target.files)
            this.modalShow();
            this.inputFile.value = '';

        });
           
        

    }
    uploadTask(files){

        let promises = [];
        [...files].forEach(element =>{
            promises.push(new Promise((resolve, reject)=>{
                let ajax = new XMLHttpRequest();
                ajax.open("POST","/upload");

                ajax.onload = event =>{
                    this.modalShow(false);
                    try {
                        resolve(JSON.parse(ajax.responseText));
                    } catch (error) {
                        this.modalShow(false);
                        reject(error);
                        
                    }
                }

                ajax.upload.onprogress = event =>{

                    this.uploadProgress(event,element);

                    console.log(event);
                   

                }

                ajax.onerror = event =>{
                    reject(event);
                }

                let formData = new FormData;

                formData.append('input-file',element);
                this.startUpload = Date.now();
                ajax.send(formData);

            }));
        
        });

        return Promise.all = (promises);
    }
    uploadProgress(event,file){

        let timeSpent = Date.now() - this.startUpload;
        let loaded = event.loaded;
        let total = event.total;
        let  percent = parseInt((loaded/total) * 100);
        let  timeleft = ((100 - percent)* timeSpent) /percent

        this.filename.textContent = file.name;
        this.timeLeft.textContent = this.formatTime(timeleft);
        this.progressBar.style = `width:${percent}%;`;

   
        

    }
    formatTime(time){

       let sec = parseInt((time / 1000) % 60);
       let min = parseInt((time / (1000 * 60)) % 60);

       if(min) return ` ${min} Minutos e ${sec}Segundos`;

       if(sec) return `${sec} segundos`;
       
    }
    modalShow(show = true){

        this.snackModal.style = (show) ? 'display:block' : 'display:none';

    }
}