# Shape code
The shape code represents normal shapes, that can be compiled into the assembly code for the plotter.
## Shapes
The following shapes can be used.
### Point
The `point` shape will print a point. It takes two arguments - X and Y  
Exapmle:  
```js
point(30, 30);
```

### Line
The `line` shape will print a line. It takes four arguments - X1, Y1, X2, Y2.  
Example:  
```js
line(50, 50, 100, 100)
```

### Regular Polygon
The `regPolygon` shape will print a regular polygon around a center. It takes four or five arguments - X, Y, Radius, Number of verticies, (Rotaion in rad).  
Example:  
```js
regPolygon(100, 100, 50, 3);
```

### Circle
The `circle` shape will print a circle around a center. It takes three arguments - X, Y, Radius
```js
circle(100, 100, 50);
```