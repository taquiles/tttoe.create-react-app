This early commit deployes code to an s3 bucket via travis.

* Bucket Policy : 

  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Sid": "PublicReadGetObject",
              "Effect": "Allow",
              "Principal": "*",
              "Action": "s3:GetObject",
              "Resource": "arn:aws:s3:::tttoe/*"
          }
      ]
  }

  * Basic Static Website Hosting  
  - Use this bucket to host a website;
  - Index document;