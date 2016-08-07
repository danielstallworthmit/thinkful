//
//  FirstViewController.swift
//  DSCalendar
//
//  Created by Daniel Stallworth on 8/4/16.
//  Copyright © 2016 Daniel Stallworth. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

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
        getNewYearJson(year)
        // else use the data for the current year already loaded
            // show the month requested
    }
    
    func getNewYearJson(year: Int) {
        // set current year variable to the new year to compare in showMonthJson 
        Alamofire.request(.GET, "http://localhost:3000/events/" + String(year))
            .responseJSON { response in
                switch response.result {
                case .Success(let data):
                    let json = JSON(data).rawString()!
                    self.jsonTextView.text = json
                //json = json.rawString()
                case .Failure(let error):
                    print("Error: " + error.localizedDescription)
                }
        }

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

