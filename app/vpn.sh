if [[ $1 == 'connect' ]]; then
	echo $4 | sudo -S bash ./app/hma-vpn.sh -c credentials.txt -p $2 $3
fi
if [[ $1 == 'disconnect' ]]; then
	echo $2 | sudo killall openvpn
fi
if [[ $1 == 'list' ]]; then
	echo $2 | sudo -S bash ./app/hma-vpn.sh -l
fi
