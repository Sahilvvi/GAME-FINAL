const imageQuestions = [{
 imageUrl:"images/plant.jpg",
 questions:[
    {
        question: "Hydroponics can be used in:",
        options: ["Identification of essential elements", "In discovery of deficiency symptoms of essential elements", "For commercial production of vegetables", "All of these"],
        answer: "All of these"
    },
    {
        question: "Plants can be grown in:",
        options: ["Only soil with essential nutrients.", "Only water with essential nutrients.", "Water, soil or air with essential nutrients.", "Water, soil or air without essential nutrients"],
        answer: "Water, soil or air with essential nutrients."
    },
    {
        question: "Which of the following is not true about hydroponics?",
        options: ["Requires initial investment", "Technical knowledge required", "Can be misused to cultivate banned crops", "Plants through hydroponics cannot be cultivated everywhere"],
        answer: "Plants through hydroponics cannot be cultivated everywhere"
    }
 ]
},
    {
        imageUrl: "images/doctor.jpg",
        questions: [
            {
                question: "Which of the following diseases is transmitted by an insect vector?",
                options: ["Malaria", "HIV/AIDS", "TB", "None of the above"],
                answer: "Malaria"
            },
            {
                question: "What does Vitamin K deficiency lead to?",
                options: ["Problem in Blood Coagulation", "Problem in digestion", "Problem in Calcium Metabolism", "All of the above"],
                answer: "Problem in digestion"
            },
            {
                question: "Which one is appointed to provide health services in villages?",
                options: ["Health guide", "Health worker", "Doctor", "All of the above"],
                answer: "Health worker"
            }
        ]
    },
    {
        imageUrl: "images/solar.jpg",
        questions: [
            {
                question: " The solar heater function is to convert the solar energy in to ____",
                options: ["Radiation", "Electrical Energy", "Thermal Energy", "None of the above"],
                answer: "Electrical Energy"
            },
            {
                question: "Which cell is used to converts solar energy directly into electrical energy ____",
                options: ["Dry Cell", "Photoelectric Cell", "Battery", "None of the above"],
                answer: "Photoelectric Cell"
            },
            {
                question: "In solar cells ___ material is used",
                options: ["Copper", "Silver", "Silicon", "None of the above"],
                answer: "Silicon"
            }
        ]
    },
    {
        imageUrl: "images/bitcoin.jpg",
        questions: [
            {
                question: "Blockchain has __ versions.",
                options: ["2", "3", "4", "5"],
                answer: "3"
            },
            {
                question: "What is the genesis block?",
                options: ["Any block created by the founder", "The last block created in the Blockchain", "The first block of a Blockchain", "The first transaction in each block"],
                answer: "The first block of a Blockchain"
            },
            {
                question: "___ receive, verify, gather and execute transactions.",
                options: ["Miner nodes", "Smart Contracts", "Light wallets", "Ethereum full node"],
                answer: "Miner nodes"
            }
        ]
    }
];

const selectedImage = imageQuestions[Math.floor(Math.random() * imageQuestions.length)];

var setup={
    puzzle_fifteen:{
       diff:300, // number of movements of the slots for shuffling pictures
       size:[512,640], // element size "fifteen" in pixels only
       grid:[3,4], // the number of squares in the height and width of the picture
       fill:true, // Stretching the area with the game to fit the element is recommended for fullscreen
       number:false, // Slot sequence number
       art:{
           url:selectedImage.imageUrl, // path to the picture (you can use any format of supported browsers, gif-animation of svg)
           ratio:false // enlarge the picture in height or width
       },
       // optional elements
       keyBoard:true, // Control using the keys on the keyboard
       gamePad:true, // Control using the joystick on the Gamepad
       time:0.1, // block move animation time
       style:"background-color:#c4cebb;display:grid;justify-items:center;align-items:center;font-family:Arial;color:#fff;border-radius:12px;font-size:32px;" // style for puzzle square
    }
}
function toggleMenu() {
   var menu = document.getElementById('left-menu');
   if (menu.classList.contains('visible')) {
       menu.classList.remove('visible');
   } else {
       menu.classList.add('visible');
   }
}
slot_style.value=setup.puzzle_fifteen.style;
var img_file=document.getElementById('img_file'),img=document.getElementById("art"),file;
img_file.addEventListener('change',loadFiles);
function loadFiles(e){
   file=img_file.files[0];
   adden_file();
}
function adden_file(){
   setup.puzzle_fifteen.art.url=window.URL.createObjectURL(file)
   img.src=setup.puzzle_fifteen.art.url;
   img.onload=function(){setup.puzzle_fifteen.size=[img.width,img.height];auto_grid();auto_style();fifteen_update();}
}
function auto_grid(){
   var s=setup.puzzle_fifteen
   if(s.size[1]<s.size[0]){s.grid=[Math.round(s.size[0]/(s.size[1]/4))-1,3]}
   else{s.grid=[3,Math.round(s.size[1]/(s.size[0]/4))-1]}
   grid_width.value=s.grid[0];
   grid_height.value=s.grid[1];
   width.value=s.size[0];
   height.value=s.size[1];
}
function auto_style(){
   var s=setup.puzzle_fifteen,v,i;
   if(s.size[1]<s.size[0]){v=Math.round((s.size[0]/s.grid[0])/16)}
   else{v=Math.round((s.size[1]/s.grid[1])/16)}
   d=s.style.split(";");
   for(i=0;i<d.length;i++){
       if(d[i].includes("border-radius")){s.style=s.style.replace(d[i],"border-radius:"+Math.round(v*1.5)+"px")}
       else if(d[i].includes("font-size")){s.style=s.style.replace(d[i],"font-size:"+(v*3)+"px")}
   }slot_style.value=s.style;
}
function fifteen_update(){
   f.innerHTML="";
   ceation_slots();
}
function fifteen_build(){
   var reader=new FileReader();
   if(file){reader.readAsDataURL(file);}else{alert('Please upload a file with a picture')}
   reader.onload=function(){setup.puzzle_fifteen.art.url=reader.result;gen_file();}
   reader.onerror=function(error){alert('Error: '+error);}
   function gen_file(){
       var url="fifteen_puzzle.js";
       var xmlhttp=new XMLHttpRequest();
       xmlhttp.onreadystatechange=function(){
           if(this.readyState==4&&this.status==200){
               var html="data:text/json;charset=utf-8,"+encodeURIComponent("<!DOCTYPE html>\n<html>\n<head>\n<style>\n body{height:97vh;padding:0;display:grid;align-content:center;justify-content:center;}\n</style>\n</head>\n<body>\n<div id='fifteen'></div>\n<script>\n"+this.responseText.replace("setup.puzzle_fifteen",JSON.stringify(setup.puzzle_fifteen,null,'\t'))+"\n<\/script>\n<\/body>\n<\/html>");
               var a=document.getElementById('dwonload');
               a.setAttribute("href", html );
               a.setAttribute("download","index.html");
               a.click();
           }
       };
       xmlhttp.open("GET",url,true);
       xmlhttp.send();
       xmlhttp.onerror=function(){if(this.status==0){alert('runetime not loaded');}}
   }
}
var drop = {
   init:function(){
       if (window.File&&window.FileReader&&window.FileList&&window.Blob) {
           window.addEventListener("dragover",function(e){
               e.preventDefault();
               e.stopPropagation();
           });
           window.addEventListener("drop",function(e){
               e.preventDefault();
               e.stopPropagation();
               file=e.dataTransfer.files[0];
               adden_file();
           });
       }
   },
};
window.addEventListener("DOMContentLoaded", drop.init);

var p=setup.puzzle_fifteen,freeslot=[],size=[],m=[],o,f=document.getElementById("fifteen");
ceation_slots();
function ceation_slots(){
    size=[p.size[0]/(p.grid[0]+1),p.size[1]/(p.grid[1]+1)]
    var c=(p.emptySlot)?p.emptySlot:(p.grid[1]+1)*(p.grid[0]+1);
    f.style.width=p.size[0]+'px';
    f.style.height=p.size[1]+'px';
    f.style.position='relative';
    if(p.fill){fifteen_resize();window.addEventListener('resize',fifteen_resize,true);}
    o=1;
    for(var y=0;y<=p.grid[1];y++){
        for(var x=0;x<=p.grid[0];x++){
            if(o!=c){
                if(!m[y]){m[y]=[]};m[y][x]=o;
                var e=document.createElement("div");
                e.id="slot"+o;
                e.setAttribute("onclick","move_slot("+o+")");
                e.className="slot";
                if(p.number){e.innerHTML=o}
                e.style="background-image:url("+p.art.url+");background-size:"+((p.art.ratio)? p.size[0]+"px auto":"auto "+p.size[1]+"px")+";background-position:-"+(size[0]*x)+"px -"+(size[1]*y)+"px ;width:"+size[0]+"px;height:"+size[1]+"px;top:"+(size[1]*y)+"px;left:"+(size[0]*x)+"px;position:absolute;"+((p.style)?p.style:"")
                if(p.time){e.style.transitionDuration=p.time+"s"}
                f.appendChild(e);o++;
            }else{m[y][x]=0;freeslot=[y,x];o++;}
        }
    }stir_slots();
}
function stir_slots(){
    for(var y=0;y<p.diff;y++){
        var a=[];
        if((Math.random()*2)>1){
            a=[freeslot[0]+(-1+Math.round(Math.random()*2)),freeslot[1]];
            if(a[0]<0){a[0]=a[0]+2}else if(a[0]>p.grid[1]){a[0]=a[0]-2}
        }else{
            a=[freeslot[0],freeslot[1]+(-1+Math.round(Math.random()*2))];
            if(a[1]<0){a[1]=a[1]+2}else if(a[1]>p.grid[0]){a[1]=a[1]-2}
        }
        var s=[m[freeslot[0]][freeslot[1]],m[a[0]][a[1]]]
        m[freeslot[0]][freeslot[1]]=s[1];m[a[0]][a[1]]=s[0]
        freeslot=[a[0],a[1]] 
    }
    for(var y=0;y<=p.grid[1];y++){
        for(var x=0;x<=p.grid[0];x++){
            if(m[y][x]){
                var e=document.getElementById("slot"+m[y][x])
                e.style.left=(x*size[0])+"px";
                e.style.top =(y*size[1])+"px";
            }
        }
    }
}
function move_slot(s) {
    var z=0,e,a=[],k,j;
    function move(y,x,h,w){
        j=m[y][x]
        e=document.getElementById("slot"+j);
        e.style.left=((x+w)*size[0])+"px";
        e.style.top =((y+h)*size[1])+"px";
        m[y][x]=k;k=j;
    }
    for(var y=0;y<p.grid[1]+1;y++){
        for(var x=0;x<p.grid[0]+1;x++){
            if(m[y][x]==s){
                a=[y,x];k=0;
                if(freeslot[0]==a[0]){
                    if(freeslot[1]>a[1]){for(z=0;z<freeslot[1]-a[1];z++){move(a[0],a[1]+z,0,+1)}}
                    else if(freeslot[1]<a[1]){for(z=0;z<a[1]-freeslot[1];z++){move(a[0],a[1]-z,0,-1)}}
                    m[freeslot[0]][freeslot[1]]=k;freeslot=[a[0],a[1]];s=false;break;
                }else if(freeslot[1]==a[1]){
                    if(freeslot[0]>a[0]){for(z=0;z<freeslot[0]-a[0];z++){ move(a[0]+z,a[1],+1,0)}}
                    else if(freeslot[0]<a[0]){for(z=0;z<a[0]-freeslot[0];z++){move(a[0]-z,a[1],-1,0)}}
                    m[freeslot[0]][freeslot[1]]=k;freeslot=[a[0],a[1]];s=false;break;
                }
            }if(!s){break;}
        }if(!s){break;}
    }check_slots();
}
function check_slots(){
    var check=1;
    for(var y=0;y<=p.grid[1];y++){
        for(var x=0;x<=p.grid[0];x++){
            if(m[y][x]==0||check==m[y][x]){check++}else{break;}
        }
    }if(check==o){setTimeout(()=>{ displayMessageAndStartQuiz(); },((p.time)?p.time*1000:0));} // <-- alert('win') script that runs at the end of the game
}
function fifteen_resize(){
    var rect=f.parentNode.getBoundingClientRect();
    if((p.size[0]/p.size[1])<(rect.width/rect.height)){f.style.transform='scale('+(rect.height/p.size[1])+')'}
    else{f.style.transform='scale('+(rect.width/p.size[0])+')'}
}
if(p.keyBoard){document.addEventListener("keydown",function(e){
    e=e.keyCode;
         if(e==37){move_slot(m[freeslot[0]][freeslot[1]+1]);}
    else if(e==39){move_slot(m[freeslot[0]][freeslot[1]-1]);}
    else if(e==38){move_slot(m[freeslot[0]+1][freeslot[1]]);}
    else if(e==40){move_slot(m[freeslot[0]-1][freeslot[1]]);}
})}
let gamepad,gamepadPress;
if(p.gamePad){window.addEventListener('gamepadconnected',function(e){
        const update=()=>{
            for (gamepad of navigator.getGamepads()){
                if (!gamepad) continue;
                const statenow=gamepad.buttons.some(btn=>btn.pressed);
                if (gamepadPress!==statenow){
                    gamepadPress=statenow;
                         if(gamepad.buttons[12].pressed&&m[freeslot[0]+1]){move_slot(m[freeslot[0]+1][freeslot[1]]);}
                    else if(gamepad.buttons[14].pressed&&m[freeslot[0]])  {move_slot(m[freeslot[0]][freeslot[1]+1]);}
                    else if(gamepad.buttons[15].pressed&&m[freeslot[0]])  {move_slot(m[freeslot[0]][freeslot[1]-1]);}
                    else if(gamepad.buttons[13].pressed&&m[freeslot[0]-1]){move_slot(m[freeslot[0]-1][freeslot[1]]);}
                }
            }
            requestAnimationFrame(update);
        };update();
    });
}

const questions = selectedImage.questions;

function displayMessageAndStartQuiz() {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    document.body.appendChild(messageContainer);

    const winMessage = document.createElement('div');
    winMessage.id = 'win-message';
    winMessage.className = 'win-message';
    winMessage.textContent = 'You won!';
    messageContainer.appendChild(winMessage);

    const startButton = document.createElement('button');
    startButton.id = 'start-quiz-btn';
    startButton.textContent = 'Start Quiz';
    messageContainer.appendChild(startButton);

    startButton.addEventListener('click', () => {
        messageContainer.remove();
        displayQuiz();
    });
}

function displayQuiz() {
    let currentQuestionIndex = 0;
    let score = 0;
    const quizContainer = document.createElement('div');
    quizContainer.className = 'quiz-container';
    document.body.appendChild(quizContainer);

    function renderQuestion(index) {
        const q = questions[index];
        quizContainer.innerHTML = `
            <div class="question-content">
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map((option) => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}" />
                        ${option}
                    </label>
                `).join('<br/>')}
            </div>
            <div class="quiz-buttons">
                <button id="next-btn">${index === questions.length - 1 ? 'Submit' : 'Next'}</button>
            </div>
        `;

        document.getElementById('next-btn').addEventListener('click', () => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }

            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                renderQuestion(currentQuestionIndex);
            } else {
                quizContainer.remove();
                showResults(score);
            }
        });
    }
    renderQuestion(currentQuestionIndex);
}

function showResults(score) {
    const points = score * 10;

    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';
    document.body.appendChild(resultContainer);

    resultContainer.innerHTML = `
        <div class="result-content">
            <h2>Quiz Results</h2>
            <p>You scored ${score} out of ${questions.length}</p>
            <p>You earned ${points} points</p>
            <button id="claim-points-btn">Claim Points</button>
        </div>
    `;

    resultContainer.style.display = 'flex';

    resultContainer.addEventListener('click', (event) => {
        if (event.target === resultContainer) {
            resultContainer.remove();
        }
    });

    document.getElementById('claim-points-btn').addEventListener('click', () => {
        resultContainer.remove();
        showClaimForm(points);
    });
}

function showClaimForm(points) {
    const claimFormContainer = document.createElement('div');
    claimFormContainer.className = 'claim-form-container';
    document.body.appendChild(claimFormContainer);

    claimFormContainer.innerHTML = `
        <div class="claim-form-content">
            <h2>Claim Your Points</h2>
            <form id="claim-form">
            <div class="inputs">
               <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="inputs">
               <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="inputs">
                <label for="number">Number:</label>
                <input type="text" id="number" name="number" required>
            </div>
              <button type="submit">Submit</button>
                
            </form>
            <p id="form-message"></p>
        </div>
    `;

    const form = document.getElementById('claim-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        document.querySelector('#form-message').textContent = 'Coming Soon';

        claimFormContainer.remove();
        showComingSoon();
    });

    claimFormContainer.style.display = 'flex';
    claimFormContainer.style.alignItems = 'center';
    claimFormContainer.style.justifyContent = 'center';
}

function showComingSoon() {
    const comingSoonContainer = document.createElement('div');
    comingSoonContainer.className = 'coming-soon-container';
    document.body.appendChild(comingSoonContainer);

    comingSoonContainer.innerHTML = `
        <div class="coming-soon-content">
            <h2>UNS Rewards Coming Soon</h2>
            <p>1000 points = 5 UNS</p>
        </div>
    `;

    comingSoonContainer.style.display = 'flex';
    comingSoonContainer.style.alignItems = 'center';
    comingSoonContainer.style.justifyContent = 'center';
    comingSoonContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    setTimeout(() => {
        comingSoonContainer.remove();
    }, 6000);
}
