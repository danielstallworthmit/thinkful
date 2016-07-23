//
//  ViewController.swift
//  FibonacciApp
//
//  Created by Daniel Stallworth on 7/22/16.
//  Copyright © 2016 Daniel Stallworth. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet weak var textView: UITextView!
    @IBOutlet weak var includesZeroSwitch: UISwitch!
    @IBOutlet weak var includesZeroLabel: UILabel!
    @IBOutlet weak var numberOfItemsLabel: UILabel!
    @IBOutlet weak var numberOfItemsSlider: UISlider!
    
    var fibonacciSequence = FibonacciSequence(numberOfItemsInSequence: 2, includesZero: true)

    override func viewDidLoad() {
        super.viewDidLoad()
        self.updateFibonacciSequence()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func updateFibonacciSequence() {
        if includesZeroSwitch.on {
            numberOfItemsSlider.maximumValue = 93
        } else {
            numberOfItemsSlider.maximumValue = 92
        }
        fibonacciSequence = FibonacciSequence(numberOfItemsInSequence: UInt64(numberOfItemsSlider.value),
                                              includesZero: includesZeroSwitch.on)
        textView.text = fibonacciSequence.values.description
        includesZeroLabel.text = includesZeroSwitch.on ? "Yes" : "No"
        numberOfItemsLabel.text = String(Int(numberOfItemsSlider.value))


    }


}

