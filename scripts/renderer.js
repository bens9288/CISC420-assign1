class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let point_a = {x:  100, y:  100};
        let point_b = {x: 300, y: 250};
        let point_c = {x: 600, y: 300};
        let point_d = {x: 640, y: 80};
        
        this.drawBezierCurve(point_a, point_b, point_c, point_d, this.num_curve_sections, [255,0,0,255], framebuffer, this.show_points);
        let point_d2 = {x:  140, y:  300};
        let point_e = {x: 400, y: 350};
        let point_f = {x: 450, y: 200};
        let point_g = {x: 700, y: 100};
        
        this.drawBezierCurve(point_d2, point_e, point_f, point_g, this.num_curve_sections, [255,0,0,255], framebuffer, this.show_points);
        
        
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let center = {x: 300, y: 250};
        let radius = 140;
        let num_edges = this.num_curve_sections;
        let color =  [0,255,255,255];
        this.drawCircle(center, radius, num_edges, color, framebuffer);

        let center1 = {x: 500, y: 500};
        let radius1 = 75;
        
        let color1 =  [255,255,0,255];
        this.drawCircle(center1, radius1, num_edges, color1, framebuffer);
        
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let color = [0,128,128,255];
        let vertexTable = [
            {x: 120, y: 50},
            {x: 200 ,y:80},
            {x: 240, y:280},
            {x: 120, y:320},
            {x: 40, y: 160},
            {x: 80, y:80},
            
        ]
        this.drawConvexPolygon(vertexTable, color, framebuffer);
        let color2 = [128,128,0,255];
        let vertexTable2 = [
            {x:310, y:80}, 
            {x: 310, y:140},
            {x: 320, y: 170},
            {x: 330, y:140},
            {x: 330, y:80}
        ]
        this.drawConvexPolygon(vertexTable2, color2, framebuffer);
        
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        // v:            object {x: __, y: __}
        // color:        array of int [R, G, B, A]
        // framebuffer:  canvas ctx image data
        let v = {x: 80, y:80};
        let color = [128, 145, 130, 255];
        this.drawVertex(v, color, framebuffer);

    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        
       

        let x, y;
        let points = [];
        let vertexList = [];
        let step = 1.0/num_edges;
        for (let t = 0.0; t <= 1.0; t+=step) {
            
            x = parseInt((1-t)**3 * p0.x + 3*(1-t)**2 *t * p1.x + 3*(1-t) * t**2 * p2.x + t**3 * p3.x);
            y = parseInt((1-t)**3 * p0.y + 3*(1-t)**2 *t * p1.y + 3*(1-t) * t**2 * p2.y + t**3 * p3.y);
            
            
            points.push({x: x, y: y});
            // console.log(x,y);
            
        }

        for (let i = 0; i < points.length-1; i++){
            
            this.drawLine(points[i], points[i+1], color, framebuffer);
            
        }
        vertexList.push(p0,p1,p2,p3);
        if(this.show_points){
            this.drawPoints(vertexList,framebuffer,color);
        }

        
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        let points = [];
        let x, y;
        let step = 360/num_edges;
        for (let i=0; i<=num_edges; i++) {
            x = parseInt(center.x + radius * Math.cos(step * i * Math.PI / 180));
            y = parseInt(center.y + radius * Math.sin(step * i * Math.PI / 180));
            points.push({x: x, y: y});
            // console.log(x,y);
        }

        for (let i = 0; i < points.length-1; i++){
            // console.log(points[i], points[i].y, points[i+1].x, points[i+1].y)
            
            this.drawLine(points[i], points[i+1], color, framebuffer);
            
        }
        // console.log(this.show_points);
        if(this.show_points){
            this.drawPoints(points,framebuffer,[0,0,0,255]);
        }
        
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        for (let i=2; i < vertex_list.length; i++) {
            // console.log(vertex_list[i].x);
            this.drawTriangle(vertex_list[0], vertex_list[i-1], vertex_list[i], color, framebuffer);
        }

        if(this.show_points){
            this.drawPoints(vertex_list,framebuffer,[0,0,0,255]);
            
        }
        
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        let vertexList = [];
        //P
        let vertexTable = [
            v, 
            {x: 80, y:200},
            {x: 100, y:200},
            {x: 100, y:80}
        ]
        this.drawConvexPolygon(vertexTable, color, framebuffer);
        //P curve
        let p1 = {x:  100, y:  200};
        let p2= {x: 170 ,y: 200};
        let p3 = {x: 170, y: 140};
        let p4 = {x: 100, y: 140};
        this.drawBezierCurve(p1,p2,p3,p4,12,color, framebuffer);
        //r rect
        let vertexTable1 = [
            {x:160, y:80}, 
            {x: 160, y:140},
            {x: 180, y:140},
            {x: 180, y:80}
        ]
        this.drawConvexPolygon(vertexTable1, color, framebuffer);
        //r curve
        let r1 = {x: 180, y: 80};
        let r2= {x: 180 ,y: 140};
        let r3 = {x: 200, y: 140};
        let r4 = {x: 220, y: 135};
        this.drawBezierCurve(r1,r2,r3,r4,12,color, framebuffer);
        //o
        let center = {x:260,y:110};
        let radius = 30;
        this.drawCircle(center, radius, 28, color, framebuffer);
        //m 
        let vertexTable2 = [
            {x:310, y:80}, 
            {x: 310, y:140},
            {x: 330, y:140},
            {x: 330, y:80}
        ]
        this.drawConvexPolygon(vertexTable2, color, framebuffer);
        //m curve1
        let m1 = {x: 330, y: 80};
        let m2= {x: 330 ,y: 160};
        let m3 = {x: 360, y: 160};
        let m4 = {x: 370, y: 110};
        this.drawBezierCurve(m1,m2,m3,m4,12,color, framebuffer);
        //m curve2
        let m5 = {x: 370, y: 80};
        let m6= {x: 370 ,y: 160};
        let m7 = {x: 410, y: 160};
        let m8 = {x: 415, y: 80};
        this.drawBezierCurve(m5,m6,m7,m8,12,color, framebuffer);
        for (let i=0; i<4; i++){
            vertexList.push(vertexTable[i]);
            vertexList.push(vertexTable1[i]);
            vertexList.push(vertexTable2[i]);
        }
        vertexList.push(m1,m2,m3,m4);
        vertexList.push(m5,m6,m7,m8);
        vertexList.push(r1,r2,r3,r4);
        vertexList.push(center);
        // console.log(vertexList);
        if(this.show_points){
            this.drawPoints(vertexList,framebuffer,[0,0,0,255]);
        }
        
    }
    drawPoints(vertexList,framebuffer,color){
        let px;
        for (let i=0; i<vertexList.length; i++) {
            px = this.pixelIndex(vertexList[i].x, vertexList[i].y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            // framebuffer.FrameBuffer.rect(vertexList[i].x,vertexList[i].y,20,20,color);
            // this.drawCircle(vertexList[i],2,1,color,framebuffer);
        }
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(framebuffer, px, color) {
	    framebuffer.data[px + 0] = color[0];
	    framebuffer.data[px + 1] = color[1];
	    framebuffer.data[px + 2] = color[2];
	    framebuffer.data[px + 3] = color[3];
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                        // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }

    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1;
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (x <= x1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            x += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                y += iy;
            }
        }
    }

    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1;
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (y <= y1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            y += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy input points
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        
        // Sort points in ascending y order
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};
