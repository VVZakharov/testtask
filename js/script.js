var pointL = document.querySelector('.point__l')
var pointR = document.querySelector('.point__r')
var timeline = document.querySelector('.timeline')
var line = document.querySelector('.date__range')
var dateline = document.querySelector('.dateline')
var pointLComment = document.querySelector('.point__l-text-date')
var pointRComment = document.querySelector('.point__r-text-date')
var start
var end
var monthBtn = document.querySelector('.btn__month')
var yearBtn = document.querySelector('.btn__year')
var formText=document.querySelector('.form__text')
var formBtn=document.querySelector('.form__btn')
formBtn.addEventListener('click',CheckAndStart)

// yearList()
var monthsArray
var fullMonthArray
var yearArray
var monthSize


// --События кнопок

monthBtn.addEventListener('click', btnClassAdd)
yearBtn.addEventListener('click', btnClassAdd)

// --События мыши

pointL.addEventListener('mousedown', addMouseMoveLeft)
document.addEventListener('mouseup', removeMouseMoveLeft)
pointR.addEventListener('mousedown', addMouseMoveRight)
document.addEventListener('mouseup', removeMouseMoveRight)

// --События тачпада

pointL.addEventListener('touchstart', addTouchMoveLeft)
document.addEventListener('touchend', removeTouchMoveLeft)
pointR.addEventListener('touchstart', addTouchMoveRight)
document.addEventListener('touchend', removeTouchMoveRight)

// --Добавление и удаление событий по движению мыши

function addMouseMoveLeft() {
  event.target.addEventListener('mousemove', moveLeftElement)
}
function removeMouseMoveLeft() {
  pointL.removeEventListener('mousemove', moveLeftElement)
}
function addMouseMoveRight() {
  pointR.addEventListener('mousemove', moveRightElement)
}
function removeMouseMoveRight() {
  event.target.removeEventListener('mousemove', moveRightElement)
}
// --Добавление и удаление событий по движению мыши

function addTouchMoveLeft() {
  event.target.addEventListener('touchmove', moveLeftElement)
}
function removeTouchMoveLeft() {
  pointL.removeEventListener('touchmove', moveLeftElement)
}
function addTouchMoveRight() {
  pointR.addEventListener('touchmove', moveRightElement)
}
function removeTouchMoveRight() {
  event.target.removeEventListener('touchmove', moveRightElement)
}

// --Движение левого тултипа

function moveLeftElement() {
  if (event.target.style.left.substring(0, 3) < 0) {
    event.target.style.left = 0
    line.style.left = 0
    for (i = 0; i < yearArray.length; i++) {
      dateCheck(pointLComment)
    }
    if(event.type=='touchmove'){
      removeTouchMoveLeft()
    }
    else{
      removeMouseMoveLeft()
    }
    
  }
  else {
    if (event.target != pointLComment) {
      if (event.target.getBoundingClientRect().right > (pointR.getBoundingClientRect().left - monthSize)) {
        if(event.type=='touchmove'){
          removeTouchMoveLeft()
        }
        else{
          removeMouseMoveLeft()
        }
      }
      if(event.type=='touchmove'){
        event.target.style.left = event.touches[0].pageX - event.target.offsetWidth / 2 - timeline.getBoundingClientRect().left + "px";
      }
      else{
        event.target.style.left = event.pageX - event.target.offsetWidth / 2 - timeline.getBoundingClientRect().left + "px";
      }
      

      line.style.left = event.target.style.left;
      for (i = 0; i < yearArray.length; i++) {
        dateCheck(pointLComment)
      }
    }
  }
}

// --Движение правого тултипа

function moveRightElement() {
  if (event.target.getBoundingClientRect().right > fullMonthArray[fullMonthArray.length - 1].getBoundingClientRect().right) {
    if(event.type=='touchmove'){
      removeTouchMoveRight()
    }
    else{
      removeMouseMoveRight()
    }
    
  }
  if (event.target.style.right.substring(0, 3) < 0) {
    event.target.style.right = 0
    line.style.right = 0
    for (i = 0; i < yearArray.length; i++) {
      dateCheck(pointRComment)
    }
    if(event.type=='touchmove'){
      removeTouchMoveRight()
    }
    else{
      removeMouseMoveRight()
    }
  }
  else {
    if (event.target != pointRComment) {
      if (event.target.getBoundingClientRect().left < (pointL.getBoundingClientRect().right + monthSize)) {
        if(event.type=='touchmove'){
          removeTouchMoveRight()
        }
        else{
          removeMouseMoveRight()
        }
      }
      if(event.type=='touchmove'){
        event.target.style.right = timeline.getBoundingClientRect().right - event.touches[0].pageX - event.target.offsetWidth / 2 + "px";
      }
      else{
        event.target.style.right = timeline.getBoundingClientRect().right - event.pageX - event.target.offsetWidth / 2 + "px";
      }
      
      line.style.right = event.target.style.right;
      for (i = 0; i < yearArray.length; i++) {
        dateCheck(pointRComment)
      }
    }

  }
}

// --Создание списка заданных дат

function yearList() {
  for (i = start; i <= end; i++) {
    for (j = 0; j < months.length; j++) {
      var $month = document.createElement('div');
      $month.classList.add('month');
      if (months[j] == 'январь') {
        $month.classList.remove('month');
        $month.classList.add('year');
        $month.innerHTML = i;
        dateline.append($month);
      }
      else {
        if (i != end) {
          $month.innerHTML = months[j].substring(0, 3)
          dateline.append($month);
        }
      }
    }
  }
}

// --Заполнение данных о дате тултипа

function dateCheck(pointComment) {
  monthResize()
  if (event.target.getBoundingClientRect().left > yearArray[i].getBoundingClientRect().left) {
    var monthNumber = Math.floor((event.target.getBoundingClientRect().left - yearArray[i].getBoundingClientRect().left) / monthSize)
    pointComment.innerHTML = months[monthNumber] + '<br>' + yearArray[i].innerHTML
  }
}

// --Переключение разбивки

function btnClassAdd() {
  if (event.target == monthBtn && !monthBtn.classList.contains('active')) {
    yearBtn.classList.remove('active')
    monthBtn.classList.add('active')
    for (i = 0; i < monthsArray.length; i++) {
      monthsArray[i].style.fontSize = '12px'

    }
  }
  else {
    if (event.target == yearBtn && !yearBtn.classList.contains('active')) {
      yearBtn.classList.add('active')
      monthBtn.classList.remove('active')
      for (i = 0; i < monthsArray.length; i++) {
        monthsArray[i].style.fontSize = '0px'
      }
    }
  }
  positionRebuild()
}

// --Перерасчет размера ячейки месяца

function monthResize() {
  monthSize = (yearArray[1].getBoundingClientRect().left - yearArray[0].getBoundingClientRect().left) / 12
}

// --Перестройка позиции тултипа при смене разбивки

function positionRebuild() {
  for (i = start; i <= end; i++) {
    for (j = 0; j < months.length; j++) {
      if (pointLComment.innerHTML == months[j] + '<br>' + i) {
        var x = (i - start) * 12 + j;
        if (event.target == monthBtn) {
          var distance = timeline.getBoundingClientRect().left - fullMonthArray[x].getBoundingClientRect().left + 50;
          if (distance < -50) {
            dateline.style.transform = 'translate(' + distance + 'px,0)'
            pointL.style.left = '50px'
            line.style.left = '50px'
          }

        }
        else {
          dateline.style.transform = 'translate(0px,0)'
          pointL.style.left = fullMonthArray[x].getBoundingClientRect().left - timeline.getBoundingClientRect().left + 'px';
          line.style.left = pointL.style.left;

        }

      }
      if (pointRComment.innerHTML == months[j] + '<br>' + i) {
        var z = (i - start) * 12 + j;
        pointR.style.right = timeline.getBoundingClientRect().width - (fullMonthArray[z].getBoundingClientRect().right - timeline.getBoundingClientRect().left) + 'px';
        line.style.right = pointR.style.right;
        if (pointR.style.right.substring(0, 3) < 0) {
          pointR.style.right = 0;
          line.style.right = 0;
        }
      }
    }
  }
}

// --Проверка данных и создание слайдера

function CheckAndStart(){
  if(!minYear.innerHTML&&!minYear.innerHTML){
    formText.innerHTML='*минимальная и максимальная даты периода должны различаться'
    
  }
  else{
    if((minMonth.options[minMonth.selectedIndex].text==maxMonth.options[maxMonth.selectedIndex].text)&&(minYear.options[minYear.selectedIndex].text==maxYear.options[maxYear.selectedIndex].text)){
      formText.innerHTML='*начало и конец периода должны различаться'
    
    }
    else{
      var formFrame=document.querySelector('.date__form')
      var sliderForm=document.querySelector('.frame')
      formFrame.classList.add('hide')
      sliderForm.classList.add('active')
      start=startYear.options[startYear.selectedIndex].text
      end=endYear.options[endYear.selectedIndex].text
      yearList()
      monthsArray = document.querySelectorAll('.month')
      fullMonthArray = document.querySelectorAll('.dateline>div')
      yearArray = document.querySelectorAll('.year')
      pointLComment.innerHTML=minMonth.options[minMonth.selectedIndex].text + '<br>' + minYear.options[minYear.selectedIndex].text
      pointRComment.innerHTML=maxMonth.options[maxMonth.selectedIndex].text + '<br>' + maxYear.options[maxYear.selectedIndex].text
      positionRebuild()

    }
  
  }
  
}