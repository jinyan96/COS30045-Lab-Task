function init() {

    var w=500;
    var h=200;

        var dataset = [ 
                    [5, 20], 
                    [480, 90], 
                    [250, 50], 
                    [100, 33], 
                    [330, 95], 
                    [410, 12], 
                    [475, 44], 
                    [25, 67], 
                    [85, 21], 
                    [220, 88] 
        ];

        var padding=10;


        var max=d3.max(dataset, function(d){
            return d[0]
        });

        //Create ScaLe
        var xscale=d3.scaleLinear()
                    //.domain([100,500])
                    //.range([10,350]);
                    .domain([d3.min(dataset,function(d){
                        return d[0]-28;
                    }),
                    d3.max(dataset,function(d){
                        return d[0]+50;
                    })])
                    .range([padding,w-padding]);

        var yscale=d3.scaleLinear()
                    //.domain([100,500])
                    //.range([10,350]);
                    .domain([d3.min(dataset,function(d){
                        return d[1]-18;
                    }),
                    d3.max(dataset,function(d){
                        return d[1]+10;
                    })])
                    .range([h-padding,padding]);

        var xAxis=d3.axisBottom()
                    .ticks(5)
                    .scale(xscale);

        var yAxis=d3.axisLeft()
                    .ticks(5)
                    .scale(yscale);


        var svg=d3.select("#chart")
                  .append("svg")
                  .attr("width",w)
                  .attr("height",h);

        svg.selectAll("circle")
            .data (dataset)
            .enter()
            .append("circle")
            .attr("cx",function(d,i){
                return xscale(d[0]);
            })
            .attr("cy",function(d){
                return yscale(d[1]);
            })
            .attr("r",5)
            .attr("fill","slategrey")
            .style("fill",function(d,i){
                if(d[0]==max){
                    return "red";
                }
            });

        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("x",(item)=>{
                return xscale(item[0]+5)
            })
            .attr("y",(item)=>{
                return yscale(item[1])
            })
            .text((item)=>{
                return item[0]+", "+item[1]
            })
            .attr("fill", "green");

        svg.append("g")
            .attr("transform", "translate(0,"+(h-padding-10)+")")
            .call(xAxis);

        svg.append("g")
            .attr("transform", "translate (" + (padding+20) + ", 0)")
            .call(yAxis);

}

window.onload = init;