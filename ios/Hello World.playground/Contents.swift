//: Playground - noun: a place where people can play

import UIKit
import XCPlayground

class Shape: UIView {
    var color:UIColor
    init(color:UIColor) {
        self.color = color
        super.init(frame: CGRectNull)
        
        self.backgroundColor = color
    }
    func getArea() -> Double {
        return 0
    }
    required init(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

class Circle: Shape {
    var radius:Int
    init(radius:Int, color:UIColor) {
        self.radius = radius
        super.init(color: color)
        self.frame.size = CGSize(width: radius * 2, height: radius * 2)
        self.layer.cornerRadius = CGFloat(radius)
    }
    
    required init(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    override func getArea() -> Double {
        return(M_PI * Double(radius * radius))
    }
}

class Square: Shape {
    var width:Int
    init(width:Int, color:UIColor) {
        self.width = width
        super.init(color: color)
        self.frame.size = CGSize(width: width, height: width)
    }
    required init(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    override func getArea() -> Double {
        return(Double(width * width))
    }
}

class Rectangle: Shape {
    var width:Int
    var height:Int
    init(width:Int, height:Int, color:UIColor){
        self.width = width
        self.height = height
        super.init(color: color)
        self.frame.size = CGSize(width: width, height: height)
    }
    required init(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    override func getArea() -> Double {
        return(Double(width * height))
    }
}

class RoundedRectangle: Rectangle {
    override init(width:Int, height:Int, color:UIColor){
        super.init(width: width, height: height, color: color)
        self.frame.size = CGSize(width: width, height: height)
        self.layer.cornerRadius = CGFloat(20)
    }
    
    required init(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

var circle = Circle(radius: 50, color: UIColor.blueColor())
circle.center = CGPoint(x: 100, y: 100)
circle.getArea()

var square = Square(width: 100, color: UIColor.redColor())
square.center = CGPoint(x: 200, y: 200)
square.getArea()

var rect = RoundedRectangle(width: 100, height: 300, color: UIColor.greenColor())
rect.center = CGPoint(x: 250, y: 250)
rect.getArea()

let view = UIView(frame: CGRect(x: 0, y: 0, width: 320, height: 320))

view.addSubview(circle)
view.addSubview(square)
view.addSubview(rect)

XCPlaygroundPage.currentPage.liveView = view


//view.backgroundColor = UIColor.yellowColor()
//let view2 = UIView(frame:CGRect(x: 0, y: 0, width: 320, height: 120))
//view2.backgroundColor = UIColor.redColor()
//view.addSubview(view2)


//XCPlaygroundPage.currentPage.liveView = view


//var circle = Circle(radius: 35, color: UIColor.redColor())
//circle.center = CGPoint(x: 100, y: 100)
//print(circle.getArea())
