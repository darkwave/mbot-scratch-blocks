#!/bin/bash

PERMISSION_FILE=/etc/udev/rules.d/99-hidraw-permissions.rules

if [ ! -f $PERMISSION_FILE ]; then
    echo "KERNEL==\"hidraw*\", SUBSYSTEM==\"hidraw\", MODE==\"777\", GROUP=\"plugdev\"" >> $PERMISSION_FILE
fi

udevadm control --reload-rules

# Link to the binary
ln -sf '/opt/${productFilename}/${executable}' '/usr/local/bin/${executable}'
