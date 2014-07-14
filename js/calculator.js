'use restrict';
var calculated;
  function init(){
    calculated = false;
  }
  function appenddigit(value) {
    // body...

    if(calculated=== true){

      result.innerHTML = value;
      document.getElementById('result').className = 'initcolor';
      calculated=false;

    }
  else{
    result.innerHTML += value;
  }
    checkPeriod();
    //FormatNumber();
  }
  function appendOperators(value){
      if(result.innerHTML==="")
        {
          if(value == "÷" || value == "+" || value == "×")
          {
          result.innerHTML='';
          calculated=false;
          }
        else{
          result.innerHTML+=value;
          document.getElementById('result').className = 'initcolor';
          calculated=false;
        }


        }
      else{
      result.innerHTML += value;
      document.getElementById('result').className = 'initcolor';
      calculated=false;
    }
  }
  function appendDots(value){
      if(result.innerHTML=="0")
        {
          document.getElementById('result').className = 'initcolor';
          result.innerHTML= "0" +value;
          calculated=false;
        }
      else {
        result.innerHTML+='.';
      }
  }


  function clean(){
    result.innerHTML='';
  }

  function backspace(){
    result.innerHTML = result.innerHTML.slice(0,-1);
    checkPeriod();
    FormatNumber();
  }
  function equl(){
    var redot = new RegExp(",", "g");
    var remultiply = new RegExp("×", "g");
    var redivide = new RegExp("÷", "g");
    result.innerHTML=result.innerHTML.replace(remultiply, "*");
    result.innerHTML=result.innerHTML.replace(redivide, "/");
    result.innerHTML=result.innerHTML.replace(redot, "");
    result.innerHTML=eval(result.innerHTML);
    if(eval(result.innerHTML)===NaN || eval(result.innerHTML)=== Infinity)
      {
        result.innerHTML='Error';
        calculated = true;
        return;
      }
    else
    checkPeriod();
    equationanimate();
    calculated = true;
  }

  function equationanimate(){
    document.getElementById("result").className = '';
    setTimeout(function(){
         document.getElementById('result').className ='start';
    }, 0);

  }

    function FormatNumber() {
          var comma = RegExp(",", "g");
          //清空
          result.innerHTML=result.innerHTML.replace(comma, "");
          result.innerHTML += "";
          var arr = result.innerHTML.split(".");
          var re = /(\d{1,3})(?=(\d{3})+$)/g;
          result.innerHTML = arr[0].replace(re,"$1,") + (arr.length == 2 ? "."+arr[1] : "");
  }
  function checkPeriod() {
	var comma = new RegExp(",", "g");
	result.innerHTML = result.innerHTML.replace(comma, "");

	var op_array = [];
	for (var i=0; i<result.innerHTML.length; i++) {
		var c = result.innerHTML.charAt(i);
		switch (c) {
			case '+':
			case '-':
			case '×':
			case '÷':
				op_array.push(c);
				break;
			default:
				break;
		}
	}

	var x = result.innerHTML;
	var separators = ['\\\+', '-', '×', '÷'];
	var tokens = x.split(new RegExp(separators.join('|'), 'g'));
	var res = '';

	if (op_array.length === 0) {
		op_array.push('');
	}

	for (var i=0; i<tokens.length; i++) {
		var c = op_array[i];
		if ((i+1) > op_array.length) {
			c = '';
		}
		res += joinComma(tokens[i]) + c;
	}

	result.innerHTML = res;
}

  function joinComma(str) {
	var arr = str.split('.');
	var re = /(\d{1,3})(?=(\d{3})+$)/g;
	var res = "";
	res = arr[0].replace(re, "$1,")+(arr.length == 2 ? "."+arr[1] : "");
	return res;
}
