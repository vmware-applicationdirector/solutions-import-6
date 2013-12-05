[BitNami Applications for VMware]: http://bitnami.org/vmware "BitNami Applications for VMware"
[BitNami concrete5 for VMware]: http://bitnami.org/vmware/concrete5 "BitNami concrete5 for VMware"


## Success
Your BitNami concrete5 application blueprint and service have been successfully imported and ready to go.

For more information about this application visit [BitNami concrete5 for VMware].

Additional information about BitNami solutions is available at [BitNami Applications for VMware].

####Please do the following steps once blueprint/services imports successfully, if deployment environment is behind the proxy:

a.	Add following lines in darwin_global.conf of VMware application director 

  	global_http_proxy= proxy_IP:proxy_port
  
  	global_https_proxy= proxy_IP:proxy_port
  
  	global_ftp_proxy= proxy_IP:proxy_port

b.	Edit to BitNami services : Add new property 

  	1.	Property name :global_conf   
  	2.	Description : URL to download Darwin global configuration for each node  
  	3.	Type: content    	
  	4.	Value : https://${darwin.server.ip}:8443/darwin/conf/darwin_global.conf  	
  	5.	Required and overridable in the Blueprint tab : Yes (Right mark)

c.	Add following lines in each action scripts

 		 # Import global conf   
  		  . $global_conf
