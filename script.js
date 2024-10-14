//** all buttons selected below:----------------------
//! API = https://the-trivia-api.com/v2/questions/


//! button Section:--
const start_btn = document.querySelector("#start_btn")
const child2_btn_next = document.querySelector("#child2_btn")
const child3_next_btn3 = document.querySelector("#next_btn3")
const child3_start_game = document.querySelector("#start_game")
const child4_btn_next = document.querySelector("#next_btn2")
const child4_btn_player2 = document.querySelector("#player2_scoreboard")
const child5_pervious = document.querySelector("#previous")
const child6_end_btn = document.querySelector("#end_btn")
const child6_replay = document.querySelector("#replay")


//! child section:---
const child1 = document.querySelector(".child1")
const child2 = document.querySelector(".child2")
const child3 = document.querySelector(".child3")
const child4 = document.querySelector(".child4")
const child5 = document.querySelector(".child5")
const child6 = document.querySelector(".child6")
const child7 = document.querySelector(".child7")

//!variables declartion:--
let playersData = {}
let easylevel = [];
let mediumlevel = [];
let hardlevel = [];
let foundeasy = false;
let foundmedium = false;
let foundhard = false;
let fetchData = []
let repeatPlayerData =[];
let questionScore;
let player1Score = 0
let player2Score = 0
let emptyCategoryFilter = []


//! questions section and other elements:-

const question_info = document.querySelector("#question_info")
const answer1 = document.querySelector(".answer1")
const answer2 = document.querySelector(".answer2")
const answer3 = document.querySelector(".answer3")
const answer4 = document.querySelector(".answer4")
const message = document.querySelector(".items2_element_message")
const start_btn2_display = document.querySelector("#start_game")
const child3_level_mode = document.querySelector("#level_mode")
const child3_players_heading = document.querySelector("#players_heading")
const child3_answerSection = document.querySelector(".answerSection")
const child4_player1_name = document.querySelector("#player1_name")
const child4_totalpoints = document.querySelector("#totalpoints")
const child5_player2_name = document.querySelector("#player2_name")
const child5_totalpoints2 = document.querySelector("#totalpoints2")
const child6_name1 = document.querySelector(".name1")
const child6_storePoints1 = document.querySelector(".storePoints1")
const child6_name2 = document.querySelector(".name2")
const child6_storePoints2 = document.querySelector(".storePoints2")
const child6_categoryname1 = document.querySelector(".categoryname1")
const child6_categoryname2 = document.querySelector(".categoryname2")
const child6_category_list = document.querySelector("#category_list")


//** all buttons functionlity below:----------------------

start_btn.addEventListener("click",()=>{
  child1.setAttribute("id","display_none")
  child2.setAttribute("id","display_block")
})

//! child2 part:------------------

child2_btn_next.addEventListener("click",()=>{
  const player1 = document.querySelector("#player1").value
  const player2 = document.querySelector("#player2").value
  const first_category = document.querySelector("#category").value
  const child2_first_category = document.querySelector("#category")



  let count = 0

  playersData = {
    player1 : player1,
    player2 : player2,
    category : first_category,
  }

  repeatPlayerData.push(playersData)
  emptyCategoryFilter.push(playersData["category"])

  let data = child2_first_category.childNodes;

  data.forEach((ele)=>{
    if(emptyCategoryFilter.includes(ele.textContent)){

        playersData["category"] = ele.textContent
        message.style.display = "flex"
        start_btn2_display.style.display="none"
        child3_next_btn3.style.display = "none"

        ele.remove()

        setTimeout(()=>{
          start_btn2_display.style.display="block"
        },10000)


        question_info.textContent = " "
        answer1.textContent = " "
        answer2.textContent = " "
        answer3.textContent = " "
        answer4.textContent = " "
    }

  })


  //! validation:
  if(player1 != ""){
    count++
  }else{
    alert("Enter Player 1 Name: ")
  }
  if(player2 != ""){
    count++
  }else{
    alert("Enter Player 2 Name: ")
  }
  if(first_category != "none"){
    count++
  }else{
    child2.setAttribute("id","display_none")
    child6.setAttribute("id","display_block")
    
  }

  if(count === 3){
    findAllQuestions(playersData,easylevel,mediumlevel,hardlevel, fetchData)
    child2.setAttribute("id","display_none")
    child3.setAttribute("id","display_block")


    setTimeout(()=>{
      start_btn2_display.style.display="block"
    },10000)
    
  }
  
})


//! child3 part:------------------

let arrspread;
child3_start_game.addEventListener("click",()=>{

      let easyQuestionSwitch = fetchData[0]["easyQuestion"].splice(0,2)
      let mediumQuestionSwitch = fetchData[0]["mediumQuestion"].splice(0,2)
      let hardQuestionSwitch = fetchData[0]["hardQuestion"].splice(0,2)
      message.style.display = "none"
      child3_next_btn3.style.display = "block"
      child3_next_btn3.innerHTML = "Let's play"
      arrspread = [...easyQuestionSwitch,...mediumQuestionSwitch,...hardQuestionSwitch]

  })


child3_next_btn3.addEventListener("click",()=>{
      questionPlay(arrspread)
      
  })
  

let scoreDisplay = {}

function questionPlay(arrspread){
    if(arrspread.length != 0){
      question_info.textContent = arrspread[0]["question"]
      answer1.textContent = arrspread[0]["incorrectAnswers"][0]
      answer2.textContent = arrspread[0]["incorrectAnswers"][1]
      answer3.textContent = arrspread[0]["incorrectAnswers"][2]
      answer4.textContent = arrspread[0]["correctAnswer"]
      child3_level_mode.textContent = arrspread[0]["difficulty"]
      questionScore = arrspread[0]["score"]

      
      let rightans = answer4.textContent = arrspread[0]["correctAnswer"]
  
      let questionData = child3_answerSection.childNodes;

      questionData.forEach((ele)=>{
        ele.addEventListener(("click"),()=>{

          if(ele.textContent === rightans){
            if(child3_players_heading.textContent === "Player 1"){
              console.log("player1")  
              ele.textContent = ""
              player1Score+=questionScore
              // alert("Correct Answer")
            }
            else if(child3_players_heading.textContent === "Player 2"){
              console.log("player2")  
              player2Score+=questionScore
              ele.textContent = ""
              // alert("Correct Answer")
            }
          }
        })
      })
      

      if(arrspread.length % 2 ==0){
        child3_players_heading.textContent = "Player 1"
      }
      else{
        child3_players_heading.textContent = "Player 2"
      }


      arrspread.shift()
      child3_next_btn3.innerHTML = "Next"
      console.log(arrspread)
      console.log(`player1 score: ${player1Score}\nplayer2 score: ${player2Score}`);
    }
    else if(arrspread.length == 0){
      child3.setAttribute("id","display_none")
      child4.setAttribute("id","display_block")
      scoreDisplay["p1_score"] = player1Score
      scoreDisplay["p2_score"] = player2Score

      child4_player1_name.textContent = repeatPlayerData[0].player1
      child4_totalpoints.textContent = scoreDisplay.p1_score

    }


  }


//! child4 part:------------------

child4_btn_next.addEventListener("click",()=>{
  child4.setAttribute("id","display_none")
  child5.setAttribute("id","display_none")
  child6.setAttribute("id","display_block")
  child6_name1.textContent = repeatPlayerData[0].player1
  child6_name2.textContent = repeatPlayerData[0].player2
  child6_storePoints1.textContent = scoreDisplay.p1_score
  child6_storePoints2.textContent = scoreDisplay.p2_score

  
  let str = emptyCategoryFilter.map((ele)=>{
      let a = " "
      return a+" "+ele
    })
  child6_categoryname1.textContent = str;
  child6_categoryname2.textContent = str

})

child4_btn_player2.addEventListener("click",()=>{
  child4.setAttribute("id","display_none")
  child5.setAttribute("id","display_block")
  child5_player2_name.textContent = repeatPlayerData[0].player2
  child5_totalpoints2.textContent = scoreDisplay.p2_score
})


//! child5 part:------------------

child5_pervious.addEventListener("click",()=>{
  child5.setAttribute("id","display_none")
  child4.setAttribute("id","display_block")
})


//! child6 part:------------------

child6_end_btn.addEventListener("click",()=>{
  child6.setAttribute("id","display_none")
  child7.setAttribute("id","display_block")
})

child6_replay.addEventListener("click",()=>{

  child6.setAttribute("id","display_none")
  child7.setAttribute("id","display_none")
  child2.setAttribute("id","display_block")

})



//! takeout data from the API:

async function triviaQuestions() {
  let data = await fetch("https://the-trivia-api.com/v2/questions/")
  let response = await data.json()
  return response;
}


function findAllQuestions(playersData,easylevel,mediumlevel,hardlevel){


  triviaQuestions().then((data)=>{
    data.map((ele)=>{  
      if(ele.category == playersData.category && ele.difficulty === "easy"){

        let questions = {
          category: ele.category,
          difficulty: ele.difficulty,
          correctAnswer: ele.correctAnswer,
          incorrectAnswers:ele.incorrectAnswers,
          question: ele.question["text"],
          score: 10
         }

        foundeasy = true
        easylevel.push(questions)
      }

      if(ele.category == playersData.category && ele.difficulty === "medium"){

        let questions = {
          category: ele.category,
          difficulty: ele.difficulty,
          correctAnswer: ele.correctAnswer,
          incorrectAnswers:ele.incorrectAnswers,
          question: ele.question["text"],
          score:15

         }

        foundmedium = true
        mediumlevel.push(questions)
      }

      if(ele.category == playersData.category && ele.difficulty === "hard"){

        let questions = {
          category: ele.category,
          difficulty: ele.difficulty,
          correctAnswer: ele.correctAnswer,
          incorrectAnswers:ele.incorrectAnswers,
          question: ele.question["text"],
          score: 20
         }

         
        foundhard = true
        hardlevel.push(questions)
      }

    })

    let n = easylevel.length
    let m = mediumlevel.length
    let o = hardlevel.length

    console.log(foundeasy)
    // console.log(foundmedium)

    if(n>=2 && m>=2 && o>=2){

      console.log("successfully data fetched:-")
      alert("successfully data fetched:-")
      let obj = {
        easyQuestion: easylevel,
        mediumQuestion: mediumlevel,
        hardQuestion: hardlevel
      }
      fetchData.push(obj)
      
    }
    else{
      findAllQuestions(playersData,easylevel,mediumlevel,hardlevel)
    }

  })

}




