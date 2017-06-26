# mbot-scratch-blocks

**mBot Scratch Blocks Alpha 3**

Very first alpha version of a [Scratch Blocks](https://github.com/LLK/scratch-blocks) editor to program the [mBot](http://learn.makeblock.com/mbot/) STEM Robotic Kit.


![mbot-scratch-blocks preview](https://github.com/darkwave/mbot-scratch-blocks/raw/master/screenshot.png)

## How to build

### Prepare your environment on Windows and OS X

* Mac OS X 10.8+
    * [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
* Windows XP, 7, 8, 10
    * Visual C++ compiler and Python 2.7
        * either:
            * `npm install --global windows-build-tools`
            * add `%USERPROFILE%\.windows-build-tools\python27` to `PATH`,
           like PowerShell: `$env:Path += ";$env:USERPROFILE\.windows-build-tools\python27"`
        * or:
          * [Python 2.7](https://www.python.org/downloads/windows/)
          * [Visual Studio Express 2013 for Desktop](https://www.visualstudio.com/downloads/download-visual-studio-vs#d-2013-express)

## Prepare your environment on GNU/Linux (Ubuntu)

```bash
sudo apt-get install build-essential
sudo apt-get install gcc-4.8 g++-4.8 && export CXX=g++-4.8
sudo apt-get install libusb-1.0-0-dev libudev-dev
```
Create create ```/etc/udev/rules.d/99-hidraw-permissions.rules``` with following line

```bash
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", MODE=="777", GROUP="plugdev"
```
And restart udev:

```bash
udevadm control --reload-rules
```
## For development

You'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) and [GIT](https://git-scm.com/downloads) installed on your computer.

Then from your command line:

```bash
# Clone this repository
git clone https://github.com/darkwave/mbot-scratch-blocks.git
# Go into unzipped folder
cd mbot-scratch-blocks
# Install dependencies (if using GNU/Linux add --driver=hidraw)
npm install
# Run the app
npm start
```
