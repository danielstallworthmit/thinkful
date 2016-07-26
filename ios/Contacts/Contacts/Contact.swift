//
//  Contact.swift
//  Contacts
//
//  Created by Daniel Stallworth on 7/26/16.
//  Copyright © 2016 Daniel Stallworth. All rights reserved.
//

import UIKit

class Contact: NSObject {
    var name: String?
    var phoneNumber: String?
    
    init(name: String? = nil, phoneNumber: String? = nil) {
        self.name = name
        self.phoneNumber = phoneNumber
        super.init()
    }

}
