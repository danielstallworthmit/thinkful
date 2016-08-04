//
//  YearDataController.swift
//  DSCalendar
//
//  Created by Daniel Stallworth on 8/4/16.
//  Copyright © 2016 Daniel Stallworth. All rights reserved.
//

import Foundation
import Alamofire
import SwiftyJSON

class YearData {
    var json: String = ""
    init(year: Int) {
        Alamofire.request(.GET, "http://localhost:3000/events/" + String(year))
            .responseJSON { response in
                switch response.result {
                case .Success(let data):
                    print(data)
                    self.json = JSON(data).rawString()!
                    //json = json.rawString()
                case .Failure(let error):
                    print("Error: " + error.localizedDescription)
                }
            }
    }
}