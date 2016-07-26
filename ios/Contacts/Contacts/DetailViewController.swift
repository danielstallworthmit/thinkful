//
//  DetailViewController.swift
//  Contacts
//
//  Created by Daniel Stallworth on 7/26/16.
//  Copyright © 2016 Daniel Stallworth. All rights reserved.
//

import UIKit

class DetailViewController: UIViewController, UITextFieldDelegate {
    @IBOutlet var nameField: UITextField!
    @IBOutlet var phoneNumberField: UITextField!
    var contact: Contact?

    override func viewDidLoad() {
        super.viewDidLoad()
        self.nameField.delegate = self
        self.phoneNumberField.delegate = self
        
        nameField.layer.borderColor = UIColor.blackColor().CGColor
        nameField.layer.borderWidth = 1
        
        phoneNumberField.layer.borderColor = UIColor.blackColor().CGColor
        phoneNumberField.layer.borderWidth = 1
        
        if let contact = self.contact {
            if let name = contact.name {
                self.nameField.text = name
            }
            if let phoneNumber = contact.phoneNumber {
                self.phoneNumberField.text = phoneNumber
            }
        }

    }
    
    func textFieldDidEndEditing(textField: UITextField) {
        if textField == self.nameField {
            self.contact?.name = textField.text
        } else if textField == self.phoneNumberField {
            self.contact?.phoneNumber = textField.text
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
