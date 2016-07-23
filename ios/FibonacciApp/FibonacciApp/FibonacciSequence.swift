//
//  FibonacciSequence.swift
//  FibonacciApp
//
//  Created by Daniel Stallworth on 7/22/16.
//  Copyright © 2016 Daniel Stallworth. All rights reserved.
//

import Foundation

class FibonacciSequence {
    
    let includesZero: Bool
    var values: [UInt64] = []
    var value: UInt64 = 0
    var x: UInt64 = 0
    var y: UInt64 = 1
    
    func zeroCheck(val: UInt64){
        if (value != 0 && !self.includesZero || self.includesZero) { values.append(val) }
    }
    
    func fibstart(fibType: String, end: UInt64) -> Array<UInt64> {
        var start: UInt64 = 0
        while start < end {
            x = y
            y = value
            zeroCheck(value)
            value = x + y
            if fibType == "maxval" { start = value }  // If want up to max Fibonacci number, use the value
            else { start = UInt64(values.count) }  // If want max numberOfItems, use current count in values array
        }
        return values
    }
    
    init(maxNumber: UInt64, includesZero: Bool) {
        self.includesZero = includesZero
        fibstart("maxval", end: maxNumber)
        //TODO: Create an array which contains the numbers in the Fibonacci sequence, but don't add any numbers to the array which exceed the maxNumber. For example, if the maxNumber is 10 then the array should contain [0,1,1,2,3,5,8] because the next number is 13 which is higher than the maxNumber. If includesZero is false then you should not include the number 0 in the sequence.
    }
    
    init(numberOfItemsInSequence: UInt64, includesZero: Bool) {
        self.includesZero = includesZero
        fibstart("maxitems", end: numberOfItemsInSequence)
        //TODO: Create an array which contains the numbers in the Fibonacci sequence, and the array should contain this many items: numberOfItemsInSequence. For example, if numberOfItemsInSequence is 10 then the array should contain [0,1,1,2,3,5,8,13,21,34] if inlcudesZero is true, or [1,1,2,3,5,8,13,21,34,55] if includesZero is false.
    }
}