# mbot-scratch-blocks

**mBot Scratch Blocks Alpha 2**

Very first alpha version of a [Scratch Blocks](https://github.com/LLK/scratch-blocks) editor to program the [mBot](http://learn.makeblock.com/mbot/) STEM Robotic Kit.


![mbot-scratch-blocks preview](https://github.com/darkwave/mbot-scratch-blocks/raw/master/screenshot.png)

## To Use

You'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

## Prepare your environment on GNU/Linux (Ubuntu)

```bash
sudo apt-get install build-essential
sudo apt-get install gcc-4.8 g++-4.8 && export CXX=g++-4.8
sudo apt-get install libusb-1.0-0-dev libudev-dev
```
Create create /etc/udev/rules.d/99-hidraw-permissions.rules with following line

```bash
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", MODE=="777", GROUP="plugdev"create
```
And restart udev:

```bash
udevadm control --reload-rules
```
## For development

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
