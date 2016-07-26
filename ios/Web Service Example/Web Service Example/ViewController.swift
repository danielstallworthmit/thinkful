//
//  ViewController.swift
//  Web Service Example
//
//  Created by Daniel Stallworth on 7/26/16.
//  Copyright © 2016 Daniel Stallworth. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var forecastLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.forecastLabel.text = ""
        
        //instantiate a gray Activity Indicator View
        let activityIndicatorView = UIActivityIndicatorView(activityIndicatorStyle: .Gray)
        //add the activity to the ViewController's view
        view.addSubview(activityIndicatorView)
        //position the Activity Indicator View in the center of the view
        activityIndicatorView.center = view.center
        //tell the Activity Indicator View to begin animating
        activityIndicatorView.startAnimating()
        
        let manager = AFHTTPSessionManager()
        
        manager.GET("http://api.openweathermap.org/data/2.5/forecast/daily?q=Dallas&mode=json&units=metric&cnt=1&appid=1fde5cf73d10af823fc0804c1dd9acb6",
                    parameters: nil,
                    progress: nil,
                    success: { (operation: NSURLSessionDataTask,responseObject: AnyObject?) in
                        if let responseObject = responseObject {
                            print("Response: " + responseObject.description)
                            activityIndicatorView.removeFromSuperview()
                            let json = JSON(responseObject)
                            if let forecast = json["list"][0]["weather"][0]["description"].string {
                                self.forecastLabel.text = forecast
                                if forecast == "light rain" {
                                    self.view.backgroundColor = UIColor.blueColor()
                                }
                            }
                        }
            },
                    failure: { (operation: NSURLSessionDataTask?,error: NSError) in
                        print("Error: " + error.localizedDescription)
        })
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

