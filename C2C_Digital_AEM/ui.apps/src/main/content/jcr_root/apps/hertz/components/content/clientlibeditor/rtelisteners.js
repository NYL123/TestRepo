(function ($, $document) {
    "use strict";

	var counter=0;





 	var generateField= function(data, status){
		//console.log("Data: " +  JSON.stringify(data) + "\nStatus: " + data[1]);
        var wraper = $(".coral-FixedColumn-column");
        var i=0; 
        $.each(data, function(i){
			//console.log("Data: " +data[i]);

            if(data[i] != "nt:unstructured"){
				//console.log("Data: " +data[i]);
				 $("#comparisonrow").append('<label class="coral-Form-fieldlabel"> Menu anchor no. : ' + i +' </label><input class="coral-Form-field coral-Textfield" type="text" name="./rows/'+ i + '" value="' + data[i] + '" data-validation="">');

            }
        });

     };



	$document.on("dialog-ready", function() {
		var compGrid = $("#comparisiongrid").length;
        //console.log("Not comparison grid dialog " + compGrid);
        var compGridTxt = $("#comparisiongridtext").length;

        var compGridRte = $("#comparisiongridrte").length;

        if(compGrid > 0 || compGridTxt > 0 || compGridRte > 0 ){ 
			//console.log("Comp Grid Dialog" + compGrid);
            comparisionGrid(); 

        }


        //console.log("value" + actionUrl.slice(0, last) + "/column.json");
		//$("#comparisonrow").append('<label class="coral-Form-fieldlabel"> Menu anchor no. : ' + counter +' </label><input class="coral-Form-field coral-Textfield" type="text" name="./new1" value="'+value+'" data-validation="">');
    });

    $document.on("dialog-success", function() {
		counter=0;
    });

    $document.on("dialog-closed", function() {
       //alert("hello"); 
        counter=0;
    });
    
    //To handle path in subgroup component
    function getNodeName(path) {
        //console.log("path passed  :"+ path);
        var str = path;
        var i = str.length;
        var n = str.lastIndexOf("/");
        var res = str.substring(n+1,i);
        return res;       
    }

    var comparisionGrid = function(){


       //console.log("ID found " + $("#comparisiongrid").length);


        var actionUrl =  $("input:hidden[name='./sling:resourceType']").closest("form").attr("action");
        var last = $("input:hidden[name='./sling:resourceType']").closest("form").attr("action").lastIndexOf("/");


        var parentUrl= actionUrl.slice(0, last);
		var last = parentUrl.lastIndexOf("/");
		var parentUrl= parentUrl.slice(0, last);
        //console.log("parent url " +  parentUrl + " actionUrl " + actionUrl);
        if(actionUrl.lastIndexOf("null") > 0){
            var ms = new Date();
    			var name = name + ms.getMilliseconds();
						var name = "rows" + ms.getMilliseconds();
                    	$("input:hidden[name='./sling:resourceType']").closest("form").attr("action",parentUrl +"/"+ name);
                    	//actionUrl = parentUrl +"/"+ name;

                    //console.log("nullfound : " + actionUrl );
                }

        actionUrl= actionUrl + "/rows.json";

        $.get(parentUrl + "/columnheader.json", function(data, status){
                //console.log("generateColumns" + data["columnheader"].length); 
                var j=0;
                var n =parseInt( data["columnheader"].length );
				var rowData="";
            	var columnheader = data;

				//console.log(JSON.parse(columnheader.columnheader[1]).columnname);

        
				//console.log("actionUrl : " + actionUrl );
                $.ajax(actionUrl).done(function(data) {
                        //console.log( "success" );
                    		//console.log("row length"+ data.length);
                    		var counter=0;
                    		var colCount =0;
                    		delete data["jcr:primaryType"] ;
                    		////console.log("new data" : + JSON.stringify(data));
                    		   $.each(data, function(i){
                                   var column = "column"+ colCount;
                                   //console.log("Data: " + data[i] + " i :" + i  +": column : "+ column );

                                if(data[i] != "nt:unstructured"){
                                    //console.log("Data data[column]: " +data[i]);
                                    var selected = "selected";
                                    var yes = "";
                                    var no = "";
                                    var na = "";
                                    var lb1 = "";
                                    var lb2 = "";

									colCount = colCount + 1;

                                   // //console.log("counter " + counter + "JSON.parse(columnheader.columnheader[column]) " + JSON.stringify(columnheader.columnheader[column]));
                                   // ---- if(data[i] ==="na"){na = selected;}else if(data[i] ==="table-pattern-d-accordion-lbl1"){lb1 = selected;}else if(data[i] === "table-pattern-d-accordion-lbl2"){ lb2 = selected;}
                                   // if(data[i] =="yes"){yes = selected;}else if(data[i] =="no"){no = selected;}
                                   //console.log("data[i] *******************" +  data[i]);

                                    //console.log("na *******************" +  na + "lb1 *******************" +  lb1 +  "lb2 *******************" +  lb2 );
                                   // console.log("******************* columnheader.columnheader[j] " +  columnheader.columnheader[j] ); 
								   var label = JSON.parse(columnheader.columnheader[j]).columnname;

                                   if(label.lastIndexOf("/")> -1){
                                         
                                          label = getNodeName(label);
                                         
                                      }
									var colName = "column" + counter;
									var subColName = "subcolumn" + counter;
                                    var Style1 = "columnText1Style"+ counter ;
                                    var Style2 = "columnText2Style"+ counter ;

                                    var styleMarkup1 = "";
                                    var styleMarkup2 = "";


                                    //var subColName = "subcolumn" + counter;

                                    //console.log("**********Style1**********" + Style1 + "**********Style2**********" + Style2 +  "data[Style1]------" + data[Style1] + "data[Style2 ]----"+data[Style2]);


                                    //console.log("  Row  i :"+  i +  "  --- counter "+counter+" data :-- " +  data[colName] );
									var val="";
                                    var subval="";
                                    var na = "";
                                    var lb1 = "";
                                    var lb2 = "";
                                    if(data[colName] == undefined ){val = ""; subval = "";} else { val = data[colName]; subval = data[subColName];}
									//if(data[i] =="na"){na = selected;}else if(data[i] == "table-pattern-d-accordion-lbl1"){lb1 = selected;}else if(data[i] == "table-pattern-d-accordion-lbl2"){ lb2 = selected;}


									if(data[Style1] === "na" ){
										styleMarkup1 = '<coral-select-item value="na">None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl1">Style 1</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl2">Style 2</coral-select-item></coral-select>';

                                    } else if(data[Style1] === "table-pattern-d-accordion-lbl1" ){

										styleMarkup1 = '<coral-select-item value="table-pattern-d-accordion-lbl1">Style 1</coral-select-item><coral-select-item value="na">None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl2" >Style 2</coral-select-item></coral-select>';

                                    } else if(data[Style1] === "table-pattern-d-accordion-lbl2"){

										styleMarkup1 = '<coral-select-item value="table-pattern-d-accordion-lbl2">Style 2</coral-select-item><coral-select-item value="na">None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl1" >Style 1</coral-select-item></coral-select>';

                                    }else{
										styleMarkup1 = '<coral-select-item value="na">None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl1">Style 1</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl2">Style 2</coral-select-item></coral-select>';

                                    } 



                                    if(data[Style2] === "na" ){

                                        styleMarkup2 = '<coral-select-item value="na" >None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl1" >Style 1</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl2">Style 2</coral-select-item></coral-select>';

                                    } else if(data[Style2] === "table-pattern-d-accordion-lbl1" ){

                                        styleMarkup2 = '<coral-select-item value="table-pattern-d-accordion-lbl1">Style 1</coral-select-item><coral-select-item value="na" >None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl2">Style 2</coral-select-item></coral-select>';

                                    } else if(data[Style2] ==="table-pattern-d-accordion-lbl2"){

                                        styleMarkup2 = '<coral-select-item value="table-pattern-d-accordion-lbl2"  >Style 2</coral-select-item><coral-select-item value="na" >None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl1">Style 1</coral-select-item>';

                                    } else{
										styleMarkup2 = '<coral-select-item value="na">None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl1">Style 1</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl2">Style 2</coral-select-item></coral-select>';

                                    }



                                   // console.log(data[Style1] + " styleMarkup1 ------------ :"+  styleMarkup1 );

                                   // console.log(data[Style2] +  "  styleMarkup2--- counter : "+ styleMarkup2 );




                                    var fieldText = '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your text" name="./rows/column'+ counter + '" value="'+ val + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label +' ,  if no text is required just put space.</coral-tooltip></div>';

                                    var fieldSelect = '<label id="label-aligned-0" class="coral-Form-fieldlabel">Column : ' + label +'</label><coral-select class="coral-Form-field" placeholder="Select one" name="./rows/'+ i + '" value="' + data[i] + '" labelledby="label-aligned-0"><coral-select-item value="yes"'+yes+'>Yes</coral-select-item><coral-select-item value="no" '+ no +'>No</coral-select-item></coral-select>';
                                    var richText = '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your text" name="./rows/column'+ counter + '" value="'+ val + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label +' ,  if no text is required just put space.</coral-tooltip></div><div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column sub-text : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your text" name="./rows/subcolumn'+ counter + '" value="'+ subval + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter sub text for column : ' + label +' ,  if no text is required just put space.</coral-tooltip></div>' ;


                                    var styleText = '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your text" name="./rows/column'+ counter + '" value="'+ val + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label +' ,  if no text is required just put space.</coral-tooltip></div><label id="label-aligned-0" class="coral-Form-fieldlabel">Column Text1 Style : ' +label+ '</label><coral-select class="coral-Form-field"  name="./rows/columnText1Style'+ counter + '" labelledby="label-aligned-0" >' +styleMarkup1+ '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column sub-text : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your text" name="./rows/subcolumn'+ counter + '" value="'+ subval + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter sub text for column : ' + label +' ,  if no text is required just put space.</coral-tooltip></div><label id="label-aligned-0" class="coral-Form-fieldlabel">Column Text2 Style : ' +label+'</label><coral-select class="coral-Form-field"  name="./rows/columnText2Style'+ counter + '" labelledby="label-aligned-0" >' + styleMarkup2 ;


                                    $("#comparisonrow").append(fieldSelect);
                              		$("#comparisonrowtext").append(fieldText);
                                    //$("#comparisiongridrte").append(richText);
									$("#comparisiongridrte").append(styleText);
                                    counter=counter+1;
                                     //console.log("**********First Group**********" + counter + subval);
                                    console.log("Data data[column]: " +data[i]);
                                    $( "input[name*='man']" ).val( "has man in it!" );
                                    //console.log("counter new : " + counter + " J J J J " +j);
                                    j=j+1;

                                }else if(data[i]== "nt:unstructured" || data[1] == undefined ){
										//console.log("failed loop nt:unstructured undefined  data[i] " + data[i]);
									 while(j<n){
                                          //console.log("failed loop nt:unstructured undefined  " + i);
                                          //console.log(createdd);
                                        var label = JSON.parse(columnheader.columnheader[j]).columnname;
                                        if(label.lastIndexOf("/")> -1){

                                          label = getNodeName(label);
                                         

                                     }

                                         var colName = "column" + j;
                                         var subColName = "subcolumn" + j;

                                    //console.log("  Row  k :"+  j +  "  --- counter "+counter+" data :-- " +  data[colName] );
									var val="";
                                    var subval="";
                                    if(data[colName] == undefined ){val = " "; subval = " "; }else{val = data[colName]; subval = data[subColName] ;}

                                         var fieldText = '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your text" value="'+val+'" name="./rows/column'+ j + '" labelledby="label-vertical-textfield-1"><coral-icon class="coral-Form-fieldinfo" icon="infoCircle"  size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label+',if no text is required just put space.</coral-tooltip></div>';
                                         var fieldSelect = '<label id="label-aligned-0" class="coral-Form-fieldlabel">Column : ' +label+'</label><coral-select class="coral-Form-field" placeholder="Select one" name="./rows/column'+ j + '" labelledby="label-aligned-0" ><coral-select-item value="yes">Yes</coral-select-item><coral-select-item value="no" selected>No</coral-select-item></coral-select>';
										 var richText = '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your text" value="'+val+'" name="./rows/column'+ j + '" labelledby="label-vertical-textfield-1"><coral-icon class="coral-Form-fieldinfo" icon="infoCircle"  size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label+',if no text is required just put space.</coral-tooltip></div>  <div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column sub-text: ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your subtext" value="'+val+'" name="./rows/subcolumn'+ j + '" labelledby="label-vertical-textfield-1"><coral-icon class="coral-Form-fieldinfo" icon="infoCircle"  size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label+',if no text is required just put space.</coral-tooltip></div>';
                                         var styleText = '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your text" value="'+val+'" name="./rows/column'+ j + '" labelledby="label-vertical-textfield-1"><coral-icon class="coral-Form-fieldinfo" icon="infoCircle"  size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label+',if no text is required just put space.</coral-tooltip></div> <label id="label-aligned-0" class="coral-Form-fieldlabel">Column Text1 Style : ' +label+'</label><coral-select class="coral-Form-field" placeholder="Select one" name="./rows/columnText1Style'+ j + '" labelledby="label-aligned-0" ><coral-select-item value="na" selected>None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl1">Style 1</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl2" >Style 2</coral-select-item></coral-select> <div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column sub-text: ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your subtext" value="'+val+'" name="./rows/subcolumn'+ j + '" labelledby="label-vertical-textfield-1"><coral-icon class="coral-Form-fieldinfo" icon="infoCircle"  size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label+',if no text is required just put space.</coral-tooltip></div><label id="label-aligned-0" class="coral-Form-fieldlabel">Column Text2 Style : ' +label+'</label><coral-select class="coral-Form-field" placeholder="Select one" name="./rows/columnText2Style'+ j + '" labelledby="label-aligned-0" ><coral-select-item value="na" selected>None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl1">Style 1</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl2" >Style 2</coral-select-item></coral-select><coral-select-item value="table-pattern-d-accordion-lbl2" selected>Style 2</coral-select-item></coral-select>';

										$("#comparisonrow").append(fieldSelect);
                              			$("#comparisonrowtext").append(fieldText);
                                        $("#comparisiongridrte").append(richText);
                                        $("#comparisiongridrte").append(styleText);
                                        console.log("**********else if  Before Fail Group**********");
                                            j=j+1;
                                      }
                                    //console.log("**********inside here **********");

                                } 

                            });
								//console.log("counter additional header " + "  :  " +  n );
                                while(counter < n){
                                    var label = JSON.parse(columnheader.columnheader[counter]).columnname;
                                    if(label.lastIndexOf("/")> -1){
                                         
                                          label = getNodeName(label);



                                     }

                                     //console.log("****** label ********" + label + "  Counter   " +  counter);
									var fieldText = '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your text" value=" " name="./rows/column'+ counter + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label +',if no text is required just put space.</coral-tooltip></div>';
                                    var fieldSelect =  '<label id="label-aligned-0" class="coral-Form-fieldlabel">Column : ' +label +'</label><coral-select class="coral-Form-field" placeholder="Select one" name="./rows/column'+ counter + '" labelledby="label-aligned-0" ><coral-select-item value="yes">Yes</coral-select-item><coral-select-item value="no" selected>No</coral-select-item></coral-select>';
                                    //console.log("****** label ********" + label + "  Counter   " +  counter);
                                    var richText = '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your text" value=" " name="./rows/column'+ counter + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label +',if no text is required just put space.</coral-tooltip></div> <div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column sub-text: ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your subtext" value=" " name="./rows/subcolumn'+ counter + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter subtext for column : ' + label +',if no text is required just put space.</coral-tooltip></div>';
									var styleText = '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your text" value=" " name="./rows/column'+ counter + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label +',if no text is required just put space.</coral-tooltip></div><label id="label-aligned-0" class="coral-Form-fieldlabel">Column Text1 Style : ' +label+'</label><coral-select class="coral-Form-field" placeholder="Select one" name="./rows/columnText1Style'+ counter + '" labelledby="label-aligned-0" ><coral-select-item value="na" selected>None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl1">Style 1</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl2">Style 2</coral-select-item></coral-select> <div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column sub-text: ' + label +'</label><input is="coral-textfield" class="coral-Form-field" placeholder="Enter your subtext" value=" " name="./rows/subcolumn'+ counter + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter subtext for column : ' + label +',if no text is required just put space.</coral-tooltip></div><label id="label-aligned-0" class="coral-Form-fieldlabel">Column Text2 Style : ' +label+'</label><coral-select class="coral-Form-field" placeholder="Select one" name="./rows/columnText2Style'+ counter + '" labelledby="label-aligned-0" ><coral-select-item value="na" selected>None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl1">Style 1</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl2">Style 2</coral-select-item></coral-select><coral-select-item value="table-pattern-d-accordion-lbl2">Style 2</coral-select-item></coral-select>';
                                    $("#comparisonrow").append(fieldSelect);
                              		$("#comparisonrowtext").append(fieldText);
                                    $("#comparisiongridrte").append(richText);
									$("#comparisiongridrte").append(styleText);
                                    console.log("**********While Before Fail Group**********");
                                    counter = counter + 1;
                                }
                      })
                      .fail(function() {
                          while(j<n){
                              //console.log("failed loop ");
                              //console.log(createdd);
                              var label = JSON.parse(columnheader.columnheader[j]).columnname;
                                    if(label.lastIndexOf("/")> -1){
                                         
                                          label = getNodeName(label);
                                         

                                     }
                              //console.log("failed loop " + label);
                              //var text = new Coral.Textfield().set({placeholder: "Enter Text here ",name: "field",value: ""});
                              var fieldText = '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" value=" " placeholder="Enter your text" name="./rows/column'+ j + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label +',if no text is required just put space.</coral-tooltip></div>';
							  var richText = '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" value=" " placeholder="Enter your text" name="./rows/column'+ j + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label +',if no text is required just put space.</coral-tooltip></div>  <div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column sub-text : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" value=" " placeholder="Enter your subtext" name="./rows/subcolumn'+ j + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter subtext for column : ' + label +',if no text is required just put space.</coral-tooltip></div>';
                              var fieldSelect = '<label id="label-aligned-0" class="coral-Form-fieldlabel">Column : ' + label +'</label><coral-select class="coral-Form-field" placeholder="Select one" name="./rows/column'+ j + '" labelledby="label-aligned-0" ><coral-select-item value="yes">Yes</coral-select-item><coral-select-item value="no" selected>No</coral-select-item></coral-select>';

							  var styleText = '<div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" value=" " placeholder="Enter your text" name="./rows/column'+ j + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter text for column : ' + label +',if no text is required just put space.</coral-tooltip></div> <label id="label-aligned-0" class="coral-Form-fieldlabel">Column Text1 Style : ' +label+'</label><coral-select class="coral-Form-field" placeholder="Select one" name="./rows/columnText1Style'+ j + '" labelledby="label-aligned-0" ><coral-select-item value="na" selected>None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl1">Style 1</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl2" >Style 2</coral-select-item></coral-select>  <div class="coral-Form-fieldwrapper"><label class="coral-Form-fieldlabel" id="label-vertical-textfield-1">Column sub-text : ' + label +'</label><input is="coral-textfield" class="coral-Form-field" value=" " placeholder="Enter your subtext" name="./rows/subcolumn'+ j + '" labelledby="label-vertical-textfield-1" required><coral-icon class="coral-Form-fieldinfo" icon="infoCircle" size="S" id="coral-form-vertical-textfield-fieldinfo"></coral-icon><coral-tooltip variant="info" placement="right" target="#coral-form-vertical-textfield-fieldinfo">Enter subtext for column : ' + label +',if no text is required just put space.</coral-tooltip></div><label id="label-aligned-0" class="coral-Form-fieldlabel">Column Text22 Style : ' +label+'</label><coral-select class="coral-Form-field" placeholder="Select one" name="./rows/columnText2Style'+ j + '" labelledby="label-aligned-0" ><coral-select-item value="na" selected>None</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl1">Style 1</coral-select-item><coral-select-item value="table-pattern-d-accordion-lbl2" >Style 2</coral-select-item></coral-select>';
                              $("#comparisonrow").append(fieldSelect);
                              $("#comparisonrowtext").append(fieldText);
                              $("#comparisiongridrte").append(styleText);
                             // console.log("**********Fail Group**********");
								j=j+1;
                          }
                      });





        });

    }

})($, $(document));
