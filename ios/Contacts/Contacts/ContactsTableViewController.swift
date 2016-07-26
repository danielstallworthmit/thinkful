//
//  ContactsTableViewController.swift
//  Contacts
//
//  Created by Daniel Stallworth on 7/26/16.
//  Copyright © 2016 Daniel Stallworth. All rights reserved.
//

import UIKit

class ContactsTableViewController: UITableViewController {
    var contacts:[Contact] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let jenny = Contact(phoneNumber: "867-5309")
        let rich = Contact(name: "Rich", phoneNumber: "888-888-8888")
        let mindy = Contact(name: "Mindy")
        
        self.contacts.append(jenny)
        self.contacts.append(rich)
        self.contacts.append(mindy)
        
        let moveButton = UIBarButtonItem(barButtonSystemItem: .Edit, target: self, action: #selector(ContactsTableViewController.toggleEdit))
        navigationItem.leftBarButtonItem = moveButton
        
        let addButton = UIBarButtonItem(barButtonSystemItem: .Add, target: self, action: #selector(ContactsTableViewController.addContact))
        navigationItem.rightBarButtonItem = addButton

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        tableView.reloadData()
    }

    // MARK: - Table view data source

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.contacts.count
    }

    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("cell", forIndexPath: indexPath)

        //         Configure the cell...
        let contact = self.contacts[indexPath.row]
        
        if let name = contact.name {
            cell.textLabel?.text = name
        } else {
            cell.textLabel?.text = "No Name"
        }

        return cell
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        let indexPath = self.tableView.indexPathForCell(sender as! UITableViewCell)!
        let contact = self.contacts[indexPath.row]
        let destination = segue.destinationViewController as! DetailViewController
        destination.contact = contact
    }
    

    
    // Override to support conditional editing of the table view.
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
 

    
    // Override to support editing the table view.
    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
        if editingStyle == .Delete {
            // Delete the row from the data source
            self.contacts.removeAtIndex(indexPath.row)
            tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
        } else if editingStyle == .Insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    
    func toggleEdit() {
        tableView.setEditing(!tableView.editing, animated: true)
    }
    
    func addContact() {
        let newContact = Contact(name: "New Contact")
        self.contacts.append(newContact)
        let newIndexPath = NSIndexPath(forRow: self.contacts.count - 1, inSection: 0)
        self.tableView.insertRowsAtIndexPaths([newIndexPath], withRowAnimation: .Automatic)
    }
 

    
    // Override to support rearranging the table view.
    override func tableView(tableView: UITableView, moveRowAtIndexPath fromIndexPath: NSIndexPath, toIndexPath: NSIndexPath) {
        let contactMoving = contacts.removeAtIndex(fromIndexPath.row)
        contacts.insert(contactMoving, atIndex: toIndexPath.row)

    }
    
    override func tableView(tableView: UITableView, editingStyleForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCellEditingStyle {
        if tableView.editing {
            return .None
        } else {
            return .Delete
        }
    }
    
    override func tableView(tableView: UITableView, shouldIndentWhileEditingRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        return false
    }
 

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(tableView: UITableView, canMoveRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
