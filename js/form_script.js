var min=2010;
var max=2022;
var months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
var minMonth = document.querySelector('.select__min-start-month')
var maxMonth = document.querySelector('.select__max-end-month')
var startYear=document.querySelector('.select__start-year')
var endYear=document.querySelector('.select__end-year')
var minYear=document.querySelector('.select__min-start-year')
var maxYear=document.querySelector('.select__max-end-year')

monthSelection(minMonth)
monthSelection(maxMonth)
yearSelection(startYear)
yearSelection(endYear)

startYear.addEventListener('change',endYearRebuild)
startYear.addEventListener('change',yearSelectionCheck)
endYear.addEventListener('change',yearSelectionCheck)
minYear.addEventListener('change',maxYearRebuild)
minMonth.addEventListener('change',maxMonthRebuild)
maxYear.addEventListener('change',maxMonthRebuild)

// --Создание списка месяцев

function monthSelection(block) {
  for (i = 0; i < months.length; i++) {
    var $month = document.createElement('option');
    $month.innerHTML=months[i]
    block.appendChild($month);
  }
}

// --Создание списка лет

function yearSelection(block) {
  for (i = min; i <=max; i++) {
    var $year = document.createElement('option');
    $year.innerHTML=i
    block.appendChild($year);
  }
}

// --Перерасчет максимальной даты

function endYearRebuild(){
  endYear.innerHTML='';
  for (i = startYear.options[startYear.selectedIndex].text; i <=max; i++) {
    var $year = document.createElement('option');
    $year.innerHTML=i
    endYear.appendChild($year);
  }
}

// --Перерасчет конечной даты

function maxYearRebuild(){
  maxYear.innerHTML='';
  for (i = minYear.options[minYear.selectedIndex].text; i <=endYear.options[endYear.selectedIndex].text; i++) {
    var $year = document.createElement('option');
    $year.innerHTML=i
    maxYear.appendChild($year);
  }
}

function maxMonthRebuild(){
  if(minYear.options[minYear.selectedIndex].text==maxYear.options[maxYear.selectedIndex].text){
    var value=minMonth.options[minMonth.selectedIndex].text;
    var x=months.indexOf(value)
    maxMonth.innerHTML='';
    for(i=x;i<months.length;i++){
      var $month = document.createElement('option');
      $month.innerHTML=months[i]
      maxMonth.appendChild($month);
    }
  
  }
  else{
    maxMonth.innerHTML='';
    monthSelection(maxMonth)
  }
}

// --Перерасчет выбора даты для тултипов

function yearSelectionCheck(){
  var min=startYear.options[startYear.selectedIndex].text;
  var max=endYear.options[endYear.selectedIndex].text;
  minYear.innerHTML='';
  maxYear.innerHTML='';
  for (i = min; i <=max; i++) {
    var $year = document.createElement('option');
    $year.innerHTML=i
    minYear.appendChild($year);
  }
  for (i = min; i <=max; i++) {
    var $year = document.createElement('option');
    $year.innerHTML=i
    maxYear.appendChild($year);
  }
}
