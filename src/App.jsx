import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle, Clock, BookOpen } from 'lucide-react';

const questions = [
    {
      id: 1,
      question: "Which of the following devices represents a hard disk partition?",
      options: ["/dev/ttyS0", "/dev/sata0", "/dev/part0", "/dev/sda2", "/dev/sda/p2"],
      correct: 3,
      explanation: "/dev/sda2 represents the second partition on the first SATA drive. Hard disk partitions follow the pattern /dev/sdXY where X is the drive letter and Y is the partition number."
    },
    {
      id: 2,
      question: "Which of the following commands sets the variable USERNAME to the value bob?",
      options: ["var USERNAME=bob", "$USERNAME==bob", "set USERNAME bob", "USERNAME=bob", "USERNAME<=bob"],
      correct: 3,
      explanation: "In bash, variables are set using the syntax VARIABLE=value without spaces around the equals sign."
    },
    {
      id: 3,
      question: "Which of the following commands are used to get information on the proper use of ls? (Choose two.)",
      options: ["usage ls", "manual ls", "info ls", "option ls", "man ls"],
      correct: [2, 4],
      explanation: "Both 'info ls' and 'man ls' provide documentation. 'man ls' shows the manual page, and 'info ls' shows the info document."
    },
    {
      id: 4,
      question: "Which command displays file names only and no additional information?",
      options: ["ls -alh", "ls -l", "ls -lh", "ls -a", "ls -nl"],
      correct: 3,
      explanation: "ls -a shows all files (including hidden ones) but without additional details. The other options show additional information like permissions, sizes, etc."
    },
    {
      id: 5,
      question: "Most commands on Linux can display information on their usage. How can this information typically be displayed?",
      options: [
        "By running the command with the option -m or --manpage.",
        "By running the command with the option -h or --help.",
        "By running the command with the option /doc or /documentation.",
        "By running the command with the option ?! or ?=!.",
        "By running the command with the option /? or /??."
      ],
      correct: 1,
      explanation: "Most Linux commands support -h or --help to display usage information."
    },
    {
      id: 6,
      question: "The file test.sh contains a valid shell script, but executing ./test.sh leads to 'Permission denied'. What should be done to successfully execute the script?",
      options: [
        "The SetUID bit should be set in the file's permissions",
        "The file's extension should be changed from .sh to .bin.",
        "The script should be run using #!/test.sh instead of ./test.sh.",
        "The execute bit should be set in the file's permissions.",
        "The user executing the script should be added to the exec group."
      ],
      correct: 3,
      explanation: "The file needs execute permissions. Use 'chmod +x test.sh' to add execute permissions."
    },
    {
      id: 7,
      question: "Which of the following keys can be pressed to exit less?",
      options: ["l", "!", "e", "x", "q"],
      correct: 4,
      explanation: "The 'q' key is used to quit/exit the less pager."
    },
    {
      id: 8,
      question: "What happens to a file residing outside the home directory when the file owner's account is deleted? (Choose two.)",
      options: [
        "The UID of the former owner is shown when listing the file's details.",
        "The file is removed from the file system.",
        "Ownership and permissions of the file remain unchanged.",
        "The user root is set as the new owner of the file.",
        "During a file system check, the file is moved to /lost+found."
      ],
      correct: [0, 2],
      explanation: "The file remains with its original UID (which now shows as a number instead of username) and permissions unchanged."
    },
    {
      id: 9,
      question: "Which of the following tar options handle compression? (Choose two.)",
      options: ["-j", "-z", "-g", "-z2", "-bz"],
      correct: [0, 1],
      explanation: "-j uses bzip2 compression and -z uses gzip compression."
    },
    {
      id: 10,
      question: "Which of the following commands will search for the file foo.txt under the directory /home?",
      options: [
        "find /home –name foo.txt",
        "find /home foo.txt",
        "find /home – file foo.txt",
        "search /home foo.txt",
        "search /home –file foo.txt"
      ],
      correct: 0,
      explanation: "The correct syntax is 'find /home -name foo.txt' to search for a file by name."
    },
    {
      id: 11,
      question: "Which of the following examples shows the general structure of a for loop in a shell script?",
      options: [
        "foreach @{file} { echo $i }",
        "for *.txt ( echo $i )",
        "for file in *.txt do echo $i done",
        "for *.txt as file => echo $file",
        "for ls *.txt exec {} \\;"
      ],
      correct: 2,
      explanation: "The bash for loop syntax is: for variable in list; do commands; done"
    },
    {
      id: 12,
      question: "What is true about the dmesg command? (Choose two.)",
      options: [
        "It immediately outputs all new messages written to the system journal.",
        "It might not display older information because it was overwritten by newer information.",
        "It sends messages to the command lines of all current user sessions.",
        "It traces the execution of a command and shows each step the program carries out.",
        "It displays the content of the Linux kernel's ring buffer."
      ],
      correct: [1, 4],
      explanation: "dmesg displays the kernel ring buffer, which has limited size so older messages may be overwritten."
    },
    {
      id: 13,
      question: "Which operator in a regular expression matches the preceding character either zero or one time?",
      options: ["%", "$", "+", "*", "?"],
      correct: 4,
      explanation: "The ? operator matches zero or one occurrence of the preceding character. * matches zero or more, + matches one or more."
    },
    {
      id: 14,
      question: "Which of the following tasks can the command passwd accomplish? (Choose two.)",
      options: [
        "Change a user's username.",
        "Lock a user account.",
        "Create a new user group.",
        "Change a user's password.",
        "Create a new user account."
      ],
      correct: [1, 3],
      explanation: "The passwd command can change passwords and lock/unlock user accounts using options like -l (lock) and -u (unlock)."
    },
    {
      id: 15,
      question: "What is true about links in a Linux file system?",
      options: [
        "A symbolic link can point to a file on another file system.",
        "A symbolic link can only point to a file and not to a directory.",
        "Only the root user can create hard links.",
        "When the target of the symbolic link is moved, the link is automatically updated.",
        "A hard link can only point to a directory and never to a file."
      ],
      correct: 0,
      explanation: "Symbolic links can point across file systems, unlike hard links which must be on the same file system."
    },
    {
      id: 16,
      question: "Which of the following outputs could stem from the command last?",
      options: [
        "1 ls\n2 cat text.txt\n3 logout",
        "root tty2 Wed May 17 21:11 - 21:11 (00:00)",
        "Password for user last changed at Sat Mar 31 16:38:57 EST 2018",
        "EXT4-fs(dm7): mounted filesystem with ordered data mode. Opts: (null)",
        "Last login: Fri Mar 23 10:56:39 2018 from server.example.com"
      ],
      correct: 1,
      explanation: "The last command shows login records with username, terminal, date/time, and duration of sessions."
    },
    {
      id: 17,
      question: "What is true about the owner of a file?",
      options: [
        "The user owning a file must be a member of the file's group.",
        "The owner of a file cannot be changed once it is assigned to an owner.",
        "Each file is owned by exactly one user and one group.",
        "The owner of a file always has full permissions when accessing the file.",
        "When a user is deleted, all files owned by the user disappear."
      ],
      correct: 2,
      explanation: "Each file has exactly one user owner and one group owner, which can be seen with ls -l."
    },
    {
      id: 18,
      question: "Which of the following statements are true regarding a typical shell script? (Choose two.)",
      options: [
        "It is located in /usr/local/scripts/.",
        "It is located in /etc/bash/scripts/.",
        "It is compiled into a binary file compatible with the current machine architecture.",
        "It starts with the two character sequence #!.",
        "It has the executable permission bit set."
      ],
      correct: [3, 4],
      explanation: "Shell scripts typically start with a shebang (#!) and need execute permissions to be run directly."
    },
    {
      id: 19,
      question: "A directory contains the following three files: texts1.txt texts2.txt texts3.csv. Which command copies the two files ending in .txt to the /tmp/ directory?",
      options: ["cp ??.txt /tmp/", "cp *.txt /tmp/", "cp.\\.txt /tmp/", "cp ?.txt /tmp/", "cp $?.txt /tmp/"],
      correct: 1,
      explanation: "The * wildcard matches any number of characters, so *.txt matches all files ending in .txt."
    },
    {
      id: 20,
      question: "Why are web browser cookies considered dangerous?",
      options: [
        "Cookies store critical data which is lost when a cookie is deleted.",
        "Cookies consume significant amounts of storage and can exhaust disk space.",
        "Cookies are always public and accessible to anyone on the internet.",
        "Cookies support identification and tracking of users.",
        "Cookies can contain and execute viruses and malware."
      ],
      correct: 3,
      explanation: "Cookies can be used to track users across websites and sessions, which raises privacy concerns."
    },
    {
      id: 21,
      question: "Which statements about the directory /etc/skel are correct? (Choose two.)",
      options: [
        "The personal user settings of root are stored in this directory.",
        "The files from the directory are copied to the home directory of the new user when starting the system.",
        "The directory contains the global settings for the Linux system.",
        "The files from the directory are copied to the home directory of a new user when the account is created.",
        "The directory contains a default set of configuration files used by the useradd command."
      ],
      correct: [3, 4],
      explanation: "/etc/skel contains template files that are copied to new user home directories when accounts are created."
    },
    {
      id: 22,
      question: "Which command adds the new user tux and creates the user's home directory with default configuration files?",
      options: ["useradd –o default tux", "passwd –a tux", "useradd –m tux", "defaultuser tux", "usercreate tux"],
      correct: 2,
      explanation: "useradd -m creates a new user account and their home directory with files from /etc/skel."
    },
    {
      id: 23,
      question: "Which of the following commands creates an archive file work.tar from the contents of the directory ./work/?",
      options: [
        "tar work > work.tar",
        "tar work.tar < ./work/",
        "tar –create work.tgz –content ./work/",
        "tar –cf work.tar ./work/",
        "tar --new work.tar ./work/"
      ],
      correct: 3,
      explanation: "tar -cf creates (-c) a tar file (-f) with the specified name from the given directory."
    },
    {
      id: 24,
      question: "Which of the following commands output the content of the file 'Texts 2.txt'? (Choose two.)",
      options: [
        "cat -- Texts 2.txt",
        "cat 'Texts 2.txt'",
        "cat |Texts 2.txt|",
        "cat Texts\\ 2.txt",
        "cat 'Texts\\ 2.txt'"
      ],
      correct: [1, 3],
      explanation: "Spaces in filenames can be handled with quotes or backslash escaping."
    },
    {
      id: 25,
      question: "Which of the following commands sorts the output of the command export-logs?",
      options: [
        "export-logs & sort",
        "export-logs > sort",
        "export-logs <> sort",
        "export-logs < sort",
        "export-logs | sort"
      ],
      correct: 4,
      explanation: "The pipe (|) operator sends the output of one command as input to another command."
    },
    {
      id: 26,
      question: "Which of the following statements regarding Linux hardware drivers is correct?",
      options: [
        "Drivers are either compiled into the Linux kernel or are loaded as kernel modules.",
        "Drivers are downloaded from the vendor's driver repository when a new device is attached.",
        "Drivers are regular Linux programs which have to be run by the user who wants to use a device.",
        "Drivers are not used by Linux because the BIOS handles all access to hardware on behalf of Linux.",
        "Drivers are stored on their devices and are copied by the Linux kernel when a new device is attached."
      ],
      correct: 0,
      explanation: "Linux drivers can be built into the kernel or loaded as modules (.ko files) as needed."
    },
    {
      id: 27,
      question: "When typing a long command line at the shell, what single character can be used to split a command across multiple lines?",
      options: ["\\", "/", "&", "|", ";"],
      correct: 0,
      explanation: "The backslash (\\) at the end of a line continues the command on the next line."
    },
    {
      id: 28,
      question: "Which of the following commands puts the lines of the file data.csv into alphabetical order?",
      options: ["a..z data.csv", "sort data.csv", "abc data.csv", "wc -s data.csv", "grep --sort data.csv"],
      correct: 1,
      explanation: "The sort command arranges lines in alphabetical (lexicographic) order."
    },
    {
      id: 29,
      question: "What is the purpose of the PATH environment variable?",
      options: [
        "It increases security by preventing commands from running in certain locations.",
        "It indicates the location of the default shell to be used when a user logs in.",
        "It allows the execution of commands without the need to know the location of the executable.",
        "It specifies the location of a user's home directory.",
        "It contains the absolute path to the current directory."
      ],
      correct: 2,
      explanation: "PATH contains directories that the shell searches for executable commands."
    },
    {
      id: 30,
      question: "How is a new Linux computing instance provisioned in an IaaS cloud?",
      options: [
        "The cloud hosting organization provides a set of pre-prepared images of popular Linux distributions.",
        "The installation has to be prepared in a local virtual machine which is then copied to the cloud.",
        "After buying a Linux distribution, its vendor delivers it to a cloud instance.",
        "A provider-specific configuration file describing the desired installation is uploaded to the cloud provider.",
        "The standard Linux installer has to be run through a remote console."
      ],
      correct: 0,
      explanation: "IaaS providers offer pre-built Linux distribution images that can be quickly deployed."
    },
    {
      id: 31,
      question: "Which one of the following statements concerning Linux passwords is true?",
      options: [
        "Passwords may never start with a non-letter.",
        "All passwords can be decrypted using the system administrator's master password.",
        "Passwords may be at most six characters long.",
        "Users cannot change their password once it has been set.",
        "Passwords are only stored in hashed form."
      ],
      correct: 4,
      explanation: "Linux stores password hashes, not the actual passwords, for security reasons."
    },
    {
      id: 32,
      question: "Which of the following commands shows the absolute path to the current working directory?",
      options: ["who", "cd ..", "pwd", "ls -l", "cd ~/home"],
      correct: 2,
      explanation: "pwd (print working directory) shows the full path of the current directory."
    },
    {
      id: 33,
      question: "A user is currently in the directory /home/user/Downloads/ and runs the command ls ../Documents/. Which directory's content is displayed?",
      options: [
        "/home/user/Downloads/Documents/",
        "/home/user/Documents/Downloads/",
        "/Documents/",
        "/home/user/Documents/",
        "/home/Documents"
      ],
      correct: 3,
      explanation: "../Documents/ goes up one level from Downloads to /home/user/, then into Documents/."
    },
    {
      id: 34,
      question: "Which of the following is a protocol used for automatic IP address configuration?",
      options: ["NFS", "LDAP", "DHCP", "SMTP", "DNS"],
      correct: 2,
      explanation: "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses to devices on a network."
    },
    {
      id: 35,
      question: "Which of the following commands adds the directory /new/dir/ to the PATH environment variable?",
      options: [
        "$PATH=/new/dir:$PATH",
        "export $PATH=/new/dir:$PATH",
        "PATH=/new/dir:PATH",
        "export PATH=/new/dir:$PATH",
        "export PATH=/new/dir:PATH"
      ],
      correct: 3,
      explanation: "export PATH=/new/dir:$PATH prepends the new directory to the existing PATH."
    },
    {
      id: 36,
      question: "What are the differences between a private web browser window and a regular web browser window? (Choose three.)",
      options: [
        "Private web browser windows do not store cookies persistently.",
        "Private web browser windows do not allow printing or storing websites.",
        "Private web browser windows do not keep records in the browser history.",
        "Private web browser windows do not support logins into websites.",
        "Private web browser windows do not send regular stored cookies."
      ],
      correct: [0, 2, 4],
      explanation: "Private browsing doesn't save history, doesn't persist cookies, and doesn't send existing cookies to websites."
    },
    {
      id: 37,
      question: "Given that test.sh is a valid shell script with permissions -rwxr-xr-x, how can this script be executed? (Choose two.)",
      options: ["cmd ./test.sh", "${test.sh}", "run test.sh", "bash test.sh", "./test.sh"],
      correct: [3, 4],
      explanation: "Scripts can be executed directly with ./script or by calling the interpreter explicitly with bash script."
    },
    {
      id: 38,
      question: "Which of the following permissions are set on the /tmp/ directory?",
      options: ["rwX", "rwxrwxrwt", "r-xr-X--t", "rwSrw-rw-", "rwxrwS---"],
      correct: 1,
      explanation: "/tmp typically has 1777 permissions (rwxrwxrwt) with the sticky bit set."
    },
    {
      id: 39,
      question: "Which permissions are set on a regular file once the permissions have been modified with the command chmod 654 file.txt?",
      options: ["d—wxr-x--", "drw-r-xr--", "–rwxrw---x", "–wxr-x--x", "-rw-r-xr--"],
      correct: 4,
      explanation: "chmod 654 sets permissions to rw-r-xr-- (6=rw-, 5=r-x, 4=r--)."
    },
    {
      id: 40,
      question: "What is true about a recursive directory listing?",
      options: [
        "It includes ownership information for the files.",
        "It includes details of file system internals, such as inodes.",
        "It includes a preview of content for each file in the directory.",
        "It includes the content of sub-directories.",
        "It includes the permissions of the directory listed."
      ],
      correct: 3,
      explanation: "A recursive listing (ls -R) shows the contents of subdirectories as well."
    },
    {
      id: 41,
      question: "Which of the following are typical services offered by public cloud providers? (Choose three.)",
      options: [
        "Internet as a Service (IaaS)",
        "Graphics as a Service (GaaS)",
        "Software as a Service (SaaS)",
        "Platform as a Service (PaaS)",
        "Infrastructure as a Service (IaaS)"
      ],
      correct: [2, 3, 4],
      explanation: "The three main cloud service models are SaaS, PaaS, and IaaS."
    },
    {
      id: 42,
      question: "Which files are the source of the information in the following output? (Choose two.) uid=1000(bob) gid=1000(bob) groups=1000(bob),10(wheel),150(wireshark),989(docker),1001(libvirt)",
      options: ["/etc/passwd", "/var/db/users", "/etc/group", "/etc/id", "/home/index"],
      correct: [0, 2],
      explanation: "This id command output comes from /etc/passwd (user info) and /etc/group (group memberships)."
    },
    {
      id: 43,
      question: "What parameter of ls prints a recursive listing of a directory's content?",
      options: ["-r", "-R", "--recursive", "-rec", "--rec"],
      correct: 1,
      explanation: "The -R option makes ls list directories recursively."
    },
    {
      id: 44,
      question: "Which of the following directories must be mounted with read and write access if it resides on its own dedicated file system?",
      options: ["/lib", "/usr", "/var", "/opt", "/etc"],
      correct: 2,
      explanation: "/var contains variable data like logs, mail, and temporary files that need write access."
    },
    {
      id: 45,
      question: "Which command is used to display the manual page for a command?",
      options: ["help", "manual", "man", "info", "doc"],
      correct: 2,
      explanation: "The man command displays manual pages for commands and system calls."
    },
    {
      id: 46,
      question: "What does the command 'grep pattern file' do?",
      options: [
        "Replaces pattern with file",
        "Searches for pattern in file",
        "Copies pattern to file",
        "Deletes pattern from file",
        "Creates a new file with pattern"
      ],
      correct: 1,
      explanation: "grep searches for lines containing the specified pattern in the given file."
    },
    {
      id: 47,
      question: "Which command is used to change file permissions?",
      options: ["chown", "chmod", "chgrp", "change", "perm"],
      correct: 1,
      explanation: "chmod (change mode) is used to modify file and directory permissions."
    },
    {
      id: 48,
      question: "What does the 'cd' command do?",
      options: [
        "Copy directory",
        "Create directory",
        "Change directory",
        "Clear directory",
        "Count directory"
      ],
      correct: 2,
      explanation: "cd stands for 'change directory' and is used to navigate between directories."
    },
    {
      id: 49,
      question: "Which command shows disk usage information?",
      options: ["du", "df", "disk", "space", "usage"],
      correct: 1,
      explanation: "df (disk free) shows file system disk space usage information."
    },
    {
      id: 50,
      question: "What does the 'ps' command display?",
      options: [
        "Print statement",
        "Process status",
        "Password settings",
        "Path structure",
        "Program syntax"
      ],
      correct: 1,
      explanation: "ps shows information about currently running processes."
    },
    {
      id: 51,
      question: "Which symbol is used for output redirection in Linux?",
      options: ["<", ">", "|", "&", ">>"],
      correct: 1,
      explanation: "The > symbol redirects command output to a file, overwriting existing content."
    },
    {
      id: 52,
      question: "What does the 'mkdir' command do?",
      options: [
        "Make directory",
        "Move directory",
        "Modify directory",
        "Mount directory",
        "Mark directory"
      ],
      correct: 0,
      explanation: "mkdir creates new directories."
    },
    {
      id: 53,
      question: "Which file contains user account information such as the user's home directory?",
      options: ["/etc/passwd", "/etc/users", "/etc/group", "/etc/login.defs", "/etc/home"],
      correct: 0,
      explanation: "/etc/passwd stores basic user account information including the home directory and shell."
    },
    {
      id: 54,
      question: "What is the correct command to display a calendar for the current month?",
      options: ["calendar", "cal", "date -c", "showdate", "month"],
      correct: 1,
      explanation: "The `cal` command displays a calendar. Without arguments, it shows the current month."
    },
    {
      id: 55,
      question: "What does the command 'touch file1' do?",
      options: [
        "Deletes file1",
        "Copies file1 to a backup",
        "Changes the file owner to root",
        "Creates file1 or updates its timestamp",
        "Displays file1 content"
      ],
      correct: 3,
      explanation: "`touch` creates a file if it doesn't exist or updates its modification time if it does."
    },
    {
      id: 56,
      question: "Which directory typically contains log files?",
      options: ["/log", "/tmp", "/usr/logs", "/var/log", "/sys/log"],
      correct: 3,
      explanation: "System logs are stored in `/var/log`, including logs from system and application services."
    },
    {
      id: 57,
      question: "Which of the following commands searches for a pattern in files?",
      options: ["find", "search", "grep", "locate", "scan"],
      correct: 2,
      explanation: "`grep` is used to search for patterns within files."
    },
    {
      id: 58,
      question: "Which command displays the number of lines, words, and characters in a file?",
      options: ["count", "ls -l", "wc", "stat", "size"],
      correct: 2,
      explanation: "`wc` (word count) displays the number of lines, words, and bytes/characters in a file."
    },
    {
      id: 59,
      question: "Which command shows the current date and time?",
      options: ["now", "time", "today", "clock", "date"],
      correct: 4,
      explanation: "`date` displays the current date and time on Linux systems."
    },
    {
      id: 60,
      question: "What does the command 'rm file1' do?",
      options: [
        "Moves file1 to trash",
        "Removes file1 permanently",
        "Renames file1",
        "Makes file1 read-only",
        "Recompiles file1"
      ],
      correct: 1,
      explanation: "`rm` deletes a file permanently without moving it to a trash bin."
    },
    {
      id: 61,
      question: "What is the effect of the 'shutdown -h now' command?",
      options: [
        "It restarts the system",
        "It suspends the system",
        "It logs out the current user",
        "It halts (shuts down) the system immediately",
        "It upgrades the system"
      ],
      correct: 3,
      explanation: "`shutdown -h now` halts the system (power off) immediately."
    },
    {
      id: 62,
      question: "Which command shows a list of running processes?",
      options: ["run", "proc", "top", "start", "exec"],
      correct: 2,
      explanation: "`top` provides a real-time view of running processes and resource usage."
    },
    {
      id: 63,
      question: "Which key combination is used to stop a running command in the terminal?",
      options: ["Ctrl+Z", "Ctrl+D", "Ctrl+C", "Ctrl+X", "Ctrl+E"],
      correct: 2,
      explanation: "`Ctrl+C` interrupts and terminates a currently running process in the terminal."
    },
    {
      id: 64,
      question: "What is the purpose of the /etc/shadow file?",
      options: [
        "To configure system updates",
        "To log login attempts",
        "To store user password hashes",
        "To manage file permissions",
        "To hold group definitions"
      ],
      correct: 2,
      explanation: "`/etc/shadow` stores encrypted user password hashes and aging information."
    },
    {
      id: 65,
      question: "Which command displays disk usage for files and directories?",
      options: ["du", "df", "ls -lh", "stat", "ps"],
      correct: 0,
      explanation: "`du` shows how much disk space is used by files and directories."
    },
    {
      id: 66,
      question: "Which command updates the package list on Debian-based systems?",
      options: ["apt-get install", "apt list", "apt-get update", "dpkg upgrade", "apt clean"],
      correct: 2,
      explanation: "`apt-get update` updates the local package index with the latest info from repositories."
    },
    {
      id: 67,
      question: "Which command is used to install new packages in Red Hat-based systems?",
      options: ["rpm -q", "yum install", "dpkg install", "apt install", "pkg add"],
      correct: 1,
      explanation: "`yum install` is used in Red Hat/CentOS to install packages from configured repos."
    },
    {
      id: 68,
      question: "Which command displays the kernel version?",
      options: ["uname", "version", "kernel", "linux", "ver"],
      correct: 0,
      explanation: "`uname -r` displays the running kernel version."
    },
    {
      id: 69,
      question: "Which command is used to change the ownership of a file?",
      options: ["chmod", "chgrp", "own", "chown", "setowner"],
      correct: 3,
      explanation: "`chown` changes the ownership of files and directories."
    },
    {
      id: 70,
      question: "Which command lists all files, including hidden ones?",
      options: ["ls -l", "ls -h", "ls -a", "ls -r", "ls -s"],
      correct: 2,
      explanation: "`ls -a` shows all files, including those beginning with a dot (hidden)."
    },
    {
      id: 71,
      question: "What symbol is used to represent the home directory?",
      options: ["/", "~", ".", "..", "$"],
      correct: 1,
      explanation: "`~` represents the current user's home directory in Linux shells."
    },
    {
      id: 72,
      question: "Which file stores user group information?",
      options: ["/etc/passwd", "/etc/group", "/etc/shadow", "/etc/gshadow", "/etc/login.defs"],
      correct: 1,
      explanation: "`/etc/group` defines the groups to which users belong."
    },
    {
      id: 73,
      question: "What is the default shell for most Linux distributions?",
      options: ["csh", "zsh", "sh", "bash", "dash"],
      correct: 3,
      explanation: "Most Linux distributions use `bash` as the default shell."
    },
    {
      id: 74,
      question: "What is the purpose of the 'man' command?",
      options: [
        "Runs background tasks",
        "Shows system manuals",
        "Mounts drives",
        "Prints a message",
        "Lists hardware info"
      ],
      correct: 1,
      explanation: "`man` displays the manual page for a command."
    },
    {
      id: 75,
      question: "Which command is used to reboot the system?",
      options: ["restart", "poweroff", "halt", "reboot", "shutdown -r"],
      correct: 3,
      explanation: "`reboot` reboots the system immediately. `shutdown -r` is also valid."
    },
    {
      id: 76,
      question: "Which command removes an empty directory?",
      options: ["rm", "rmdir", "deldir", "removedir", "rdel"],
      correct: 1,
      explanation: "`rmdir` deletes a directory, but only if it is empty."
    },
    {
      id: 77,
      question: "Which of the following commands moves a file?",
      options: ["mv", "cp", "rm", "push", "goto"],
      correct: 0,
      explanation: "`mv` moves or renames files and directories."
    },
    {
      id: 78,
      question: "What does 'sudo' allow a user to do?",
      options: [
        "Switch to another terminal",
        "Suspend user accounts",
        "Access remote systems",
        "Run commands with elevated privileges",
        "Restart the shell"
      ],
      correct: 3,
      explanation: "`sudo` allows permitted users to run commands as another user, typically root."
    },
    {
      id: 79,
      question: "What is the name of the process that is always the first process in a Linux system?",
      options: ["init", "bash", "kernel", "login", "systemd"],
      correct: 4,
      explanation: "On modern systems, `systemd` is the first process (PID 1) started by the kernel."
    },
    {
      id: 80,
      question: "Which file defines environment variables for all users?",
      options: ["/etc/env", "/etc/profile", "~/.bashrc", "~/.profile", "/etc/bashrc"],
      correct: 1,
      explanation: "`/etc/profile` sets environment variables and startup settings for all users."
    }
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function ProgrammingQuizApp() {
  const [shuffledQuestions, setShuffledQuestions] = useState(() => shuffleArray([...questions]));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswerSelect = (answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    shuffledQuestions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setShuffledQuestions(shuffleArray([...questions]));
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTimeElapsed(0);
    setStartTime(Date.now());
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressColor = () => {
    const answered = Object.keys(answers).length;
    const percentage = (answered / shuffledQuestions.length) * 100;
    if (percentage < 33) return 'bg-red-500';
    if (percentage < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">¡Examen Completado!</h1>
              <div className="flex items-center justify-center gap-2 text-white/80">
                <Clock className="w-5 h-5" />
                <span>Tiempo total: {formatTime(timeElapsed)}</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 mb-8">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-white mb-2">{percentage}%</div>
                <div className="text-xl text-white/80">
                  {score} de {shuffledQuestions.length} respuestas correctas
                </div>
              </div>

              <div className="w-full bg-white/20 rounded-full h-4 mb-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    percentage >= 70 ? 'bg-green-500' : 
                    percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="text-center text-white/80">
                {percentage >= 70 ? '¡Excelente trabajo! 🎉' :
                 percentage >= 50 ? 'Buen esfuerzo, puedes mejorar 📚' :
                 'Necesitas estudiar más 💪'}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {shuffledQuestions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <div key={question.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-2">
                          {index + 1}. {question.question}
                        </h3>
                        <div className="space-y-1 text-sm">
                          <div className="text-green-400">
                            ✓ Correcta: {question.options[question.correct]}
                          </div>
                          {userAnswer !== undefined && userAnswer !== question.correct && (
                            <div className="text-red-400">
                              ✗ Tu respuesta: {question.options[userAnswer]}
                            </div>
                          )}
                          {userAnswer === undefined && (
                            <div className="text-yellow-400">
                              ⚠ No respondida
                            </div>
                          )}
                        </div>
                        <div className="mt-2 text-white/70 text-sm">
                          💡 {question.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
                Intentar de Nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = shuffledQuestions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / shuffledQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Linux Essential</h1>
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
              <div className="text-sm">
                {currentQuestion + 1} / {shuffledQuestions.length}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${getProgressColor()}`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-center text-white/60 text-sm mt-2">
            {answeredCount} de {shuffledQuestions.length} preguntas respondidas
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-6">
          <div className="mb-6">
            <div className="text-purple-300 text-sm font-semibold mb-2">
              Pregunta {currentQuestion + 1} de {shuffledQuestions.length}
            </div>
            <h2 className="text-2xl font-bold text-white leading-relaxed">
              {question.question}
            </h2>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isAnswered = answers[currentQuestion] !== undefined;
              const isSelected = answers[currentQuestion] === index;
              const isCorrect = index === question.correct;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-green-600/50 border-green-400 text-white'
                        : isSelected
                        ? 'bg-red-600/50 border-red-400 text-white'
                        : 'bg-white/5 border-white/20 text-white/90'
                      : isSelected
                      ? 'bg-purple-600/50 border-purple-400 text-white'
                      : 'bg-white/5 border-white/20 text-white/90 hover:bg-white/10 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-green-500 border-green-400 text-white'
                            : isSelected
                            ? 'bg-red-500 border-red-400 text-white'
                            : 'border-white/40 text-white/60'
                          : isSelected
                          ? 'bg-purple-500 border-purple-400 text-white'
                          : 'border-white/40 text-white/60'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {answers[currentQuestion] !== undefined && (
            <div className="mt-4">
              {answers[currentQuestion] === question.correct ? (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>¡Respuesta correcta!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-400">
                  <XCircle className="w-5 h-5" />
                  <span>
                    Respuesta incorrecta. Correcta: {question.options[question.correct]}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/40 text-white rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Anterior
            </button>

            <div className="flex gap-2 max-w-md overflow-x-auto">
              {shuffledQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 flex-shrink-0 ${
                    index === currentQuestion
                      ? 'bg-purple-600 text-white'
                      : answers[index] !== undefined
                      ? 'bg-green-600 text-white'
                      : 'bg-white/20 text-white/60 hover:bg-white/30'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === shuffledQuestions.length - 1 ? (
              <button
                onClick={() => setShowResults(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Finalizar Examen
                <CheckCircle className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(shuffledQuestions.length - 1, currentQuestion + 1))}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200"
              >
                Siguiente
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
