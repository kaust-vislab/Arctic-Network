function generatechord(matrix1){
  d3.csv("species-oceanic.csv", function(cities) {
  d3.json("matrix.json", function(matrix2) {
    // Compute the chord layout.
    layout.matrix(matrix1);

////////////////////////////////////////////////////////////
/////////////// Create the gradient fills //////////////////
////////////////////////////////////////////////////////////

//Function to create the id for each chord gradient
function getGradID(d){ return "linkGrad-" + d.source.index + "-" + d.target.index; }

//Create the gradients definitions for each chord
var grads = svg.append("defs").selectAll("linearGradient")
  .data(layout.chords())
   .enter().append("linearGradient")
  .attr("id", getGradID)
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", function(d,i) { return innerRadius * Math.cos((d.source.endAngle-d.source.startAngle)/2 + d.source.startAngle - Math.PI/2); })
  .attr("y1", function(d,i) { return innerRadius * Math.sin((d.source.endAngle-d.source.startAngle)/2 + d.source.startAngle - Math.PI/2); })
  .attr("x2", function(d,i) { return innerRadius * Math.cos((d.target.endAngle-d.target.startAngle)/2 + d.target.startAngle - Math.PI/2); })
  .attr("y2", function(d,i) { return innerRadius * Math.sin((d.target.endAngle-d.target.startAngle)/2 + d.target.startAngle - Math.PI/2); })

//Set the starting color (at 0%)
grads.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", function(d){ 
 // return "green";
  // if(matrix2[d.source.index][d.target.index] < 0) return 'red';
  //         else return 'green';
    //return colors(d.source.index); 

  if(matrix2[d.source.index][d.target.index] == 0.30 ) return 'cyan';
          else if(matrix2[d.source.index][d.target.index] == 0.81 ) return '#696969';
          else if(matrix2[d.source.index][d.target.index] == 1.1 ) return 'yellow';
          else if(matrix2[d.source.index][d.target.index] == -1.03 ) return '#FFFF33';
          else if(matrix2[d.source.index][d.target.index] >= 2.001 && matrix2[d.source.index][d.target.index] <= 2.03) return '#ffd700';
          else if(matrix2[d.source.index][d.target.index] <0) return 'red';
          else if(matrix2[d.source.index][d.target.index] >0) return 'green';
            

            return "";
  });

//Set the ending color (at 100%)
grads.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", function(d){ 
      //return "red";
  // if(matrix2[d.target.index][d.source.index] < 0) return 'red';
  //         else return 'green';
    //return colors(d.target.index); 
    if(matrix2[d.source.index][d.target.index] == 0.30 ) return 'cyan';
          else if(matrix2[d.target.index][d.source.index] == 0.81 ) return '#696969';
          else if(matrix2[d.target.index][d.source.index] == 1.1 ) return 'yellow';
          else if(matrix2[d.target.index][d.source.index] == -1.03 ) return '#FFFF33';
          else if(matrix2[d.target.index][d.source.index] >= 2.001 && matrix2[d.target.index][d.source.index] <= 2.03) return '#ffd700';
          else if(matrix2[d.target.index][d.source.index] <0) return 'red';
          else if(matrix2[d.target.index][d.source.index] >0) return 'green';

          return "";
   });
////////////////////////////////////////////////////////////


    // Add a group per neighborhood.
    var group = svg.selectAll(".group")
        .data(layout.groups)
      .enter().append("g")
        .attr("class", "group")        
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

    // Add a mouseover title.
    group.append("title").text(function(d, i) {
      //console.log(d);
       return cities[i].name;// + ", Total Value:" + formatPercent(d.value) 
    });

    // Add the group arc.
    var groupPath = group.append("path")
        .attr("id", function(d, i) { return "group" + i; })
        .attr("d", arc)
        .style("fill", function(d, i) { return cities[i].color; });
        // .style("stroke", function(d, i, j) { return "black"; })
        // .style("stroke-width", function(d, i) { return arr[d.index] *0.85; });

    // Add a text label.
    var groupText = group.append("text")
        //.attr("x", function(d, i){console.log( groupPath[0][i].getTotalLength()/2);})   //6
        .attr("dy", 15)
         

//     groupText.append("textPath")
//         .attr("xlink:href", function(d, i) { return "#group" + i; })
//         .text(function(d, i) { return cities[i].name; });

    // Remove the labels that don't fit. :(
//     groupText.filter(function(d, i) { return groupPath[0][i].getTotalLength() / 2 - 30 < this.getComputedTextLength(); })
//         .remove();
    
        
      group.append("svg:text")
      .each(function(d,i) { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
            + "translate(" + (innerRadius + 33) + ")"
            + (d.angle > Math.PI ? "rotate(180)" : "");
      })
      .text(function(d,i) { return cities[i].name; })
      .style("fill", function(d, i) { return cities[i].color; })
    .attr("shape-rendering","crispEdges")
    .attr("font-family","Arial")
    .attr("font-size","13px");


    // Add the chords.
    var chord = svg.selectAll(".chord")
        .data(layout.chords)
        .enter().append("path")
        .attr("class", "chord")
        .style("fill", function(d,i) { 
          // if(matrix2[d.source.index][d.target.index] == 0.30 ) return 'cyan';
          // else if(matrix2[d.source.index][d.target.index] == 0.81 ) return '#696969';
          // else if(matrix2[d.source.index][d.target.index] == 1.1 ) return 'yellow';
          // else if(matrix2[d.source.index][d.target.index] == -1.03 ) return '#FFFF33';
          // else if(matrix2[d.source.index][d.target.index] == 2.01 || matrix2[d.source.index][d.target.index] == 2.02) return '#ffd700';
          // else if(matrix2[d.source.index][d.target.index] <0) return 'red';
          // else if(matrix2[d.source.index][d.target.index] >0) return 'green';

          //return cities[d.source.index].color; 
          return "url(#" + getGradID(d) + ")";
        })
        .style("stroke-dasharray", function (d,i){
          if (checkuncertain(matrix2[d.source.index][d.target.index])) return "2,4";
          else return "0";
        })
         .style("stroke-width", function (d,i){
          if (checkuncertain(matrix2[d.source.index][d.target.index])) return "1.0px";
          else return "0.1px";
        })
        // .style("opacity", function(d){
        //    if (showchords==2){
        //      if(matrix1[d.source.index][d.target.index] < 0) return 0;
        //      else return 1;
        //    }
        //    else if (showchords==3){
        //      if(matrix1[d.source.index][d.target.index] > 0) return 0;
        //      else return 1;
        //    }
        // })
        .attr("d", path)
        .on("mouseover", chordmouseover)
        .on("mouseout", chordmouseout);

    //Add an elaborate mouseover title for each chord.
    chord.append("title").text(function(d) {
      var temp=1,temp2=1;
      if(matrix2[d.source.index][d.target.index] < 0) temp=-1;
      if(matrix2[d.target.index][d.source.index] < 0) temp2=-1;
      return cities[d.source.index].name
          + " → " + cities[d.target.index].name
          + ": " + decode((d.source.value*temp))
          + "\n" + cities[d.target.index].name
          + " → " + cities[d.source.index].name
          + ": " + decode((d.target.value*temp2));
    });

   function mouseover(d, i) {
       svg.selectAll("path.chord")
        .filter(function(d) { 
          //console.log(d);
          if(showchords==1)  return d.source.index !== i && d.target.index !== i; 
          else if(showchords==2) { 
             //if(matrix2[d.source.index][d.target.index] > 0 || matrix2[d.target.index][d.source.index] > 0) return d.source.index !== i && d.target.index !== i; 
             if(matrix2[d.source.index][d.target.index] <= 0 && matrix2[d.target.index][d.source.index] <= 0) return false;
             else {
                if (!(arrp.includes(matrix2[d.source.index][d.target.index]) && arrp.includes(matrix2[d.target.index][d.source.index])) ) {
                 if((matrix2[d.source.index][d.target.index]==0 && arrp.includes(matrix2[d.target.index][d.source.index])) ) return false;
                 else if((matrix2[d.target.index][d.source.index]==0 && arrp.includes(matrix2[d.source.index][d.target.index])) ) return false;
                 else return d.source.index !== i && d.target.index !== i;
                }
                else return false;
             }
          }
          else if(showchords==3) { 
            // if(matrix2[d.source.index][d.target.index] < 0 || matrix2[d.target.index][d.source.index] < 0) return d.source.index !== i && d.target.index !== i; 
             if(matrix2[d.source.index][d.target.index] >= 0 && matrix2[d.target.index][d.source.index] >= 0) return false;
             else {
               if (!(arrn.includes(matrix2[d.source.index][d.target.index]) && arrn.includes(matrix2[d.target.index][d.source.index])) ) {
                 if((matrix2[d.source.index][d.target.index]==0 && arrn.includes(matrix2[d.target.index][d.source.index])) ) return false;
                 else if((matrix2[d.target.index][d.source.index]==0 && arrn.includes(matrix2[d.source.index][d.target.index])) ) return false;
                 else return d.source.index !== i && d.target.index !== i;
               }
               else return false;
             }
          }
          else if(showchords==4) { 
             if(arrpn.includes(matrix2[d.source.index][d.target.index])  || arrpn.includes(matrix2[d.target.index][d.source.index])) return d.source.index !== i && d.target.index !== i; 
          }
        })
        .transition()
        .style("opacity", 0.15);
    }
    function mouseout(d, i) {
       svg.selectAll("path.chord")
        .filter(function(d) { 
          if(showchords==1)  return d.source.index !== i && d.target.index !== i; 
          else if(showchords==2) { 
             //if(matrix2[d.source.index][d.target.index] > 0 || matrix2[d.target.index][d.source.index] > 0) return d.source.index !== i && d.target.index !== i; 
             if(matrix2[d.source.index][d.target.index] <= 0 && matrix2[d.target.index][d.source.index] <= 0) return false;
             else {
                if (!(arrp.includes(matrix2[d.source.index][d.target.index]) && arrp.includes(matrix2[d.target.index][d.source.index])) ) {
                 if((matrix2[d.source.index][d.target.index]==0 && arrp.includes(matrix2[d.target.index][d.source.index])) ) return false;
                 else if((matrix2[d.target.index][d.source.index]==0 && arrp.includes(matrix2[d.source.index][d.target.index])) ) return false;
                 else return true;
                }
                else return false;
             }
          }
          else if(showchords==3) { 
             //if(matrix2[d.source.index][d.target.index] < 0 || matrix2[d.target.index][d.source.index] < 0) return d.source.index !== i && d.target.index !== i; 
             if(matrix2[d.source.index][d.target.index] >= 0 && matrix2[d.target.index][d.source.index] >= 0) return false;
             else {
               if (!(arrn.includes(matrix2[d.source.index][d.target.index]) && arrn.includes(matrix2[d.target.index][d.source.index])) ) {
                 if((matrix2[d.source.index][d.target.index]==0 && arrn.includes(matrix2[d.target.index][d.source.index])) ) return false;
                 else if((matrix2[d.target.index][d.source.index]==0 && arrn.includes(matrix2[d.source.index][d.target.index])) ) return false;
                 else return d.source.index !== i && d.target.index !== i;
               }
               else return false;
             }
          }
           else if(showchords==4) { 
             if(arrpn.includes(matrix2[d.source.index][d.target.index])  || arrpn.includes(matrix2[d.target.index][d.source.index])) return d.source.index !== i && d.target.index !== i; 
          }
        })
        .transition()
        .style("opacity", 1);
    }
    
  function chordmouseover(d, i) {
       svg.selectAll("path.chord")
        .filter(function(d) { 
          //console.log(d);
          if(showchords==1)  return true; 
          else if(showchords==2) {              
             if(matrix2[d.source.index][d.target.index] <= 0 && matrix2[d.target.index][d.source.index] <= 0) return false;
             else {
                if (!(arrp.includes(matrix2[d.source.index][d.target.index]) && arrp.includes(matrix2[d.target.index][d.source.index])) ) {
                 if((matrix2[d.source.index][d.target.index]==0 && arrp.includes(matrix2[d.target.index][d.source.index])) ) return false;
                 else if((matrix2[d.target.index][d.source.index]==0 && arrp.includes(matrix2[d.source.index][d.target.index])) ) return false;
                 else return true;
                }
                else return false;
             }
          }
          else if(showchords==3) {              
             if(matrix2[d.source.index][d.target.index] >= 0 && matrix2[d.target.index][d.source.index] >= 0) return false;
              else {
               if (!(arrn.includes(matrix2[d.source.index][d.target.index]) && arrn.includes(matrix2[d.target.index][d.source.index])) ) {
                 if((matrix2[d.source.index][d.target.index]==0 && arrn.includes(matrix2[d.target.index][d.source.index])) ) return false;
                 else if((matrix2[d.target.index][d.source.index]==0 && arrn.includes(matrix2[d.source.index][d.target.index])) ) return false;
                 else return true;
               }
               else return false;
             }
          }
          else if(showchords==4) {              
              if(arrpn.includes(matrix2[d.source.index][d.target.index]) || arrpn.includes(matrix2[d.target.index][d.source.index]) ) return true;
              else return false;
          }
        })
        .transition()
        .style("opacity", 0.15);

        if(showchords==2) { 
             if( (matrix2[d.source.index][d.target.index] > 0 || matrix2[d.target.index][d.source.index] > 0))   
              if(!(arrp.includes(matrix2[d.source.index][d.target.index]) && arrp.includes(matrix2[d.target.index][d.source.index]))) {
                if((matrix2[d.source.index][d.target.index]==0 && arrp.includes(matrix2[d.target.index][d.source.index])) ) return false;
                 else if((matrix2[d.target.index][d.source.index]==0 && arrp.includes(matrix2[d.source.index][d.target.index])) ) return false;
                 else d3.select(this).transition().style("opacity", 1);
              }
        }
        else if(showchords==3) { 
             if(matrix2[d.source.index][d.target.index] < 0 || matrix2[d.target.index][d.source.index] < 0) 
               if (!(arrn.includes(matrix2[d.source.index][d.target.index]) && arrn.includes(matrix2[d.target.index][d.source.index])) ){
                if((matrix2[d.source.index][d.target.index]==0 && arrn.includes(matrix2[d.target.index][d.source.index])) ) return false;
                 else if((matrix2[d.target.index][d.source.index]==0 && arrn.includes(matrix2[d.source.index][d.target.index])) ) return false;
                 else d3.select(this).transition().style("opacity", 1);
               }
        }
        else if(showchords==4) { 
              if(arrpn.includes(matrix2[d.source.index][d.target.index]) || arrpn.includes(matrix2[d.target.index][d.source.index]) ) d3.select(this).transition().style("opacity", 1);
        }
        else d3.select(this).transition().style("opacity", 1);
        
    }
    function chordmouseout(d, i) {
       svg.selectAll("path.chord")
        .filter(function(d) { 
          if(showchords==1)  return true; 
          else if(showchords==2) {              
             if(matrix2[d.source.index][d.target.index] <= 0 && matrix2[d.target.index][d.source.index] <= 0) return false;
             else {
              if (!(arrp.includes(matrix2[d.source.index][d.target.index]) && arrp.includes(matrix2[d.target.index][d.source.index])) ) {
               if((matrix2[d.source.index][d.target.index]==0 && arrp.includes(matrix2[d.target.index][d.source.index])) ) return false;
               else if((matrix2[d.target.index][d.source.index]==0 && arrp.includes(matrix2[d.source.index][d.target.index])) ) return false;
               else return true;
              }
              else return false;
             }
          }
          else if(showchords==3) { 
             if(matrix2[d.source.index][d.target.index] >= 0 && matrix2[d.target.index][d.source.index] >= 0) return false;
             else {
               if (!(arrn.includes(matrix2[d.source.index][d.target.index]) && arrn.includes(matrix2[d.target.index][d.source.index])) ) {
                 if((matrix2[d.source.index][d.target.index]==0 && arrn.includes(matrix2[d.target.index][d.source.index])) ) return false;
                 else if((matrix2[d.target.index][d.source.index]==0 && arrn.includes(matrix2[d.source.index][d.target.index])) ) return false;
                 else return true;
               }
               else return false;
             } 
          }
          else if(showchords==4) { 
              if(arrpn.includes(matrix2[d.source.index][d.target.index]) || arrpn.includes(matrix2[d.target.index][d.source.index]) ) return true;
              else return false;
          }
        })
        .transition()
        .style("opacity", 1);
    }

 //Append Legend
var teams = [
  "Negative Effect " ,
  "Positive Effect",
  "(0), Uncertain if there is effect or not",  
  "(-+) or (+-), Uncertain if effect is -ve or +ve",
  "Both Positive & Negative Effects",
  // "-(+)",
  "----      Striped chords reprsent uncertain effects."];


var colors = [ "red", "green", "cyan", "#696969", "#FFFF33"];  //,"#ffd700"

var color = d3.scale.ordinal()      //custom color scale for teams
                .range(colors)
                .domain(teams);
svg.append("rect")   
.attr("x",((width/4)))
.attr("y",-height/2.2)
.attr("width",290)
.attr("height",140)
.attr("style","fill-opacity:0.1;stroke:black;stroke-width:1.5px");

var legend = svg.append("g")
    .attr("class", "legend")
    .attr("width", 150)
    .attr("height", 170)
    .attr("transform", "translate("+ ((width/4)+5) + ",-"+ ((height/2.2)-10) +" )");

var gs = legend.selectAll("g.keybox")
          .data(teams).enter().append("g")
          .attr("class", "keybox")
          .attr("width", 80)
          .attr("height", 15);

gs.append("text")
  .attr("class","keybox").attr("x",function(d,i){
    if (i==5) {return 5;}// for stripe chord message   
    else if(i<10){return 35;}
    else{return 90;}})
  .attr("y",function(d,i){
    if(i<10){return i*20 +9;}
    else{return (i-4)*20 +9;}})
  .text(function(d,i){
    return teams[i];})
  .attr("font-size","14px");
  
  // gs.append("text")
  // .attr("class","keybox")
  // .attr("x", 5)
  // .attr("y",130)
  // .text("---  striped chords reprsent uncertain effects.")
  // .attr("font-size","14px");

gs.append("rect")        
  .attr("x",function(d,i){
    if(i<10){return 0;}
    else{return 75;}})
  .attr("y",function(d,i){
     if(i<10){return i*20;
     }
     else{return (i-4) * 20;}})
  .attr("width",30)
  .attr("height",10)
  .style("fill",function(d, i){
    return colors[i];})
  .style("opacity", function(d,i){ if (i==5) return 0; else return 1;});



  });
});

function checkuncertain(inp){
  var arr = [0.30,0.81,2.02,-1.03,1.5-1.5,2.5];//.map(function(x) { return x * scl; });
  if(arr.includes(inp)) { return true;} 
  else return false;
}

function decode(inp){
  //console.log(inp + " "+ (inp==2.5));
  if (inp == 0) return "0";
  else if (inp == 0.4* scl) return "(+)";
  else if (inp == -0.4* scl) return "(-)";
  else if (inp == 0.30* scl) return "(0)";
  else if (inp == 0.81* scl) return "(-+)";
  else if (inp == 1.1* scl) return "+-";
  else if (inp == 2.01* scl) return "++--";
  else if (inp == 2.02* scl) return "(++--)";
  else if (inp == -1.03* scl) return "-(+)";
  else if (inp == 1.5* scl) return "+(+)";
  else if (inp == -1.5* scl) return "-(-)";
  else if (inp == 2.5* scl) return "++(+)";
  else if (inp == 1* scl) return "+";
  else if (inp == 2* scl) return "++";
  else if (inp == 3* scl) return "+++";
  else if (inp == -1* scl) return "-";
  else if (inp == -2* scl) return "--";
  else if (inp == -3* scl) return "---";

  return "errrrrrrrorrrrr";
}

} //#8bc48a #fd8b8a