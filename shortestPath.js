shortestPath = {
  edges: [],

  //Main function based on the reverse-delete algorithm
  calculate : function(allPoints){
    this.allPoints = allPoints;
    this.createEdges();
    this.sortEdges();

    let aPoint, bPoint;
    let i = 0;
    let edge;

    while(i < this.edges.length){
      aPoint = {...this.edges[i].aPoint};

      edge = this.edges.splice(i, 1);
      if(this.isEdgeBridge(aPoint)){
        this.edges.splice(i,0,edge[0]);
        i++;
      }

    }

    this.renderResult();
  },

  //Creates all possible edges based on known points
  //All edges are added to edges array
  createEdges: function(){
    for(let i = 0; i<this.allPoints.length-1; i++){
      let j = i+1;
      while(j<this.allPoints.length){
        let dist = this.calcTwoPointDist(this.allPoints[i], this.allPoints[j])
        this.edges.push({
          aPoint: this.allPoints[i],
          bPoint: this.allPoints[j],
          distance: dist
        })
        j++;
      }
    }
  },

  //Sorts edges array in descending order
  sortEdges: function(){
    function compare(a, b){
      if(a.distance < b.distance){
        return 1;
      }
      if(a.distance > b.distance){
        return -1;
      }
      return 0;
    }

    this.edges.sort(compare)
  },

  //Returns true if edge will split spanning tree into two smaller trees
  isEdgeBridge: function(aPoint){
    return (this.countConnectedVertices(aPoint) !== this.allPoints.length)
  },

  //BFS algorithm that will return the number of points connected to a given point;
  countConnectedVertices: function(aPoint){
    let neighbours = [];
    let visited = [];
    let points = [...this.allPoints];

    let curPoint = aPoint

    findPoint = id =>{
      return points.find( point => point.id === id);
    };
    hasPoint = edge => {
      return(edge.aPoint.id === curPoint.id || edge.bPoint.id === curPoint.id)
    };
    isVisited = id => {
      index = visited.indexOf(id)
      return (index >= 0) ? true : false;
    };
    isAlreadyNeighbour = id => {
      let index = neighbours.indexOf(id, curPoint.id)
      if(id === curPoint.id) return true;
      return (index >= 0) ? true : false;
    };

    while(true){
      let curPointEdges = this.edges.filter(hasPoint)
      curPointEdges.map(edge => {
        if(edge.aPoint.id === curPoint.id){
          if(!isVisited(edge.bPoint.id) && !isAlreadyNeighbour(edge.bPoint.id)) {
            neighbours.push(edge.bPoint.id)
          }
        }else{
          if(!isVisited(edge.aPoint.id) && !isAlreadyNeighbour(edge.aPoint.id)){
            neighbours.push(edge.aPoint.id)
          }
        }
      })
      visited.push(curPoint.id);
      if(neighbours.length === 0) break;
      curPoint = findPoint(neighbours.shift());
    }

    return visited.length;
  },

  calcTwoPointDist: function(aPoint, bPoint){
    return Math.sqrt((aPoint.x - bPoint.x)**2 + (aPoint.y - bPoint.y)**2);
  },

  renderResult: function(){
    renderGrid.render(this.allPoints, this.edges);
  }
}
