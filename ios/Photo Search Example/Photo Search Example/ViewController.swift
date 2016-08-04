//
//  ViewController.swift
//  Photo Search Example
//
//  Created by Daniel Stallworth on 8/3/16.
//  Copyright © 2016 Daniel Stallworth. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

class ViewController: UIViewController, UISearchBarDelegate {
    
    
    @IBOutlet weak var scrollView: UIScrollView!
    //MARK: ViewController lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()
        searchFlickrByHashtag("dogs")
        
    }
    //MARK: Utility methods
    func searchFlickrByHashtag(searchString:String) {
        //let manager = AFHTTPSessionManager()
        
        let searchParameters = ["method": "flickr.photos.search",
                                "api_key": "KEY",
                                "format": "json",
                                "nojsoncallback": 1,
                                "text": searchString,
                                "extras": "url_m",
                                "per_page": 2]
        
        Alamofire.request(
                    .GET, "https://api.flickr.com/services/rest/",
                    parameters: searchParameters as! [String : AnyObject])
                    //progress: nil,
                .responseJSON { response in
                    switch response.result {
                      case .Success(let json):
                        //print(response)
                        let json = JSON(json)
                        //print(json["photos"]["photo"][0])
                        if let photoArray = json["photos"]["photo"].array {
                            self.scrollView.contentSize = CGSizeMake(320, 320 * CGFloat(photoArray.count))
                            for (i,photoDictionary) in photoArray.enumerate() {
                                if let imageURLString = photoDictionary["url_m"].string {
                                    let imageView = UIImageView(frame: CGRectMake(0, 320*CGFloat(i), 320, 320))
                                    let url = NSURL(string: imageURLString)!
                                    let task = NSURLSession.sharedSession().dataTaskWithURL(url) { (responseData, responseUrl, error) -> Void in
                                        //if let data = NSData(contentsOfURL: url){
                                        if let data = responseData {
                                            dispatch_async(dispatch_get_main_queue(), { () -> Void in
                                                imageView.image = UIImage(data: data)
                                                self.scrollView.addSubview(imageView)
                                            })
                                        }
                                    }
                                    task.resume()
                                }
                            }
                        }
                      
                    case .Failure(let error):
                        print("Error: " + error.localizedDescription)
                    }
                }
        
    }
    //MARK: UISearchBarDelegate protocol methods
    func searchBarSearchButtonClicked(searchBar: UISearchBar) {
        for subview in self.scrollView.subviews {
            subview.removeFromSuperview()
        }
        searchBar.resignFirstResponder()
        if let searchText = searchBar.text {
            searchFlickrByHashtag(searchText)
        }
        
    }
}

