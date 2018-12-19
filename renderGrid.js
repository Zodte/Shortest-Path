renderGrid = {
  pointSize: 4,

  render: function(points, edges){
    let canvas = document.getElementById("myCanvas");
    this.width = canvas.width;
    this.height = canvas.height;
    this.unit = this.height/1000;
    let ctx = canvas.getContext("2d");

    let i;
    for(i = 0; i<points.length; i++){
      let point = points[i]
      this.drawPoint(ctx, point)
    }
    for(i = 0; i<edges.length; i++){
      this.drawLine(ctx, edges[i].aPoint, edges[i].bPoint)
    }

  },

  drawPoint: function(ctx, point){
    ctx.fillStyle = "#000";

    ctx.beginPath()
    ctx.arc(point.x*this.unit, this.height-point.y*this.unit, this.pointSize,0, 2*Math.PI);
    ctx.fill();
  },

  drawLine: function(ctx, aPoint, bPoint){
    ctx.beginPath();
    ctx.moveTo(aPoint.x*this.unit, this.height-aPoint.y*this.unit);
    ctx.lineTo(bPoint.x*this.unit, this.height-bPoint.y*this.unit);
    ctx.closePath();
    ctx.stroke();
  }
}
