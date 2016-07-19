// Thinkful Playground
// Thinkful.com

// Fibonacci Sequence

// By definition, the first two numbers in the Fibonacci sequence are 1 and 1, or 0 and 1, depending on the chosen starting point of the sequence, and each subsequent number is the sum of the previous two.

import UIKit

class FibonacciSequence {
    
    let includesZero: Bool
    var values: [Int]
    var value = 0
    var x = 0
    var y = 1
    var cnt = 0
    
    func fibstart(fibType: String, end: Int) -> Array<Int> {
        var start: Int = 0
        while start < end {
            x = y
            y = value
            if (value != 0 && !self.includesZero || self.includesZero) { self.values.append(value) }
            value = x + y
            if fibType == "maxval" { start = value }
            else { start = self.values.count }
        }
        return self.values
    }
    
    init(maxNumber: Int, includesZero: Bool) {
        self.values = []
        self.includesZero = includesZero
        fibstart("maxval", end: maxNumber)
        //TODO: Create an array which contains the numbers in the Fibonacci sequence, but don't add any numbers to the array which exceed the maxNumber. For example, if the maxNumber is 10 then the array should contain [0,1,1,2,3,5,8] because the next number is 13 which is higher than the maxNumber. If includesZero is false then you should not include the number 0 in the sequence.
    }
    
    init(numberOfItemsInSequence: Int, includesZero: Bool) {
        self.values = []
        self.includesZero = includesZero
        fibstart("maxitems", end: numberOfItemsInSequence)
        //TODO: Create an array which contains the numbers in the Fibonacci sequence, and the array should contain this many items: numberOfItemsInSequence. For example, if numberOfItemsInSequence is 10 then the array should contain [0,1,1,2,3,5,8,13,21,34] if inlcudesZero is true, or [1,1,2,3,5,8,13,21,34,55] if includesZero is false.
    }
}

let fibanocciSequence = FibonacciSequence(maxNumber:12345, includesZero: false)

let anotherSequence = FibonacciSequence(numberOfItemsInSequence: 10, includesZero: true)
