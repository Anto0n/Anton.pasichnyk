## Admin notes

Install ComEmu: https://conemu.github.io/

Set Git Bash Mode.

Generate public/private RSA key:

    ssh-keygen

Access to the Bionic server:

    ssh cotton@edu.bionic-university.com -p 2270
    pass: 9cnHRywR

#### Simplify access via ssh

http://nerderati.com/2011/03/17/simplify-your-life-with-an-ssh-config-file/

Run: 

    ssh-copy-id cotton@edu.bionic-university.com -2270
	
Create file ~/.ssh/config: 

    Host cotton
        HostName edu.bionic-university.com
        Port 2270
        User cotton
	
Now you can access to Bionic server using command without any passwords:

    ssh cotton


#### Connect to MySQL from the Bionic server:

    ssh cotton
    mysql --host=localhost --user=root --password=internship
 