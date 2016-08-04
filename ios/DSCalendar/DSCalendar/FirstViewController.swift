//
//  FirstViewController.swift
//  DSCalendar
//
//  Created by Daniel Stallworth on 8/4/16.
//  Copyright © 2016 Daniel Stallworth. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController {

    @IBOutlet weak var jsonTextView: UITextView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let currentYear = NSCalendar.currentCalendar().components([NSCalendarUnit.Year], fromDate: NSDate()).year
        print(currentYear)
        showMonthJson(8, year: currentYear)
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    func showMonthJson(month: Int, year: Int) {
        // if switching to new year, call API to get data for new year
            jsonTextView.text = getNewYearJson(year)
            print(jsonTextView.text)
        // else use the data for the current year already loaded
            // show the month requested
    }
    
    func getNewYearJson(year: Int) -> String{
        // set current year variable to the new year to compare in showMonthJson 
        return YearData(year: year).json
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

