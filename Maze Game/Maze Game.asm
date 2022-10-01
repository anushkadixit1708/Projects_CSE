INCLUDE "emu8086.inc"
name "ESCAPE PLAN"

org     100h
.data
  a dw 0
  b dw 0
  aal dw 0 
  c dw 0
  d dw 0

s_size  equ     2

maze dw s_size dup(0)

star    dw      ?

left    equ     4bh
right   equ     4dh
up      equ     48h
down    equ     50h

cur_dir db      right

wait_time dw    0 
keypress dw 0

msg db "WELCOME GAMER!", 0dh,0ah
	db "ESCAPE THE TRAP IN MINIMUM NUMBER OF MOVE", 0dh,0ah
	db "GAME RULES:", 0dh,0ah
	db "1.USE ARROW KEYS FOR MOVEMENT AROUND THE BOARD.", 0dh,0ah, 0ah
	
	db "2.YOU ARE REPRESENTED AS THE SMILE SYMBOL AND TRY TO GET OUT OF THE TRAP BY PLAYING OVER THE ARROW KEYS. ", 0dh,0ah
	
	
	db "LET THE GAME BEGIN :D  ", 0dh,0ah	
	db "3..2..1..ROCK!!", 0dh,0ah, 0ah
	
	db "press any key to start...$"
	db "====================", 0dh,0ah, 0ah

     
     
         
   maz1  DB  0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
   maz2  DB  1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1
   maz3  DB  1,0,1,0,0,0,0,1,1,0,0,0,1,1,0,1,0,1,0,1
   maz4  DB  1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,0,0,1,0,1
   maz5  DB  1,0,0,0,0,1,0,1,1,0,1,1,0,0,0,1,1,1,0,1
   maz6  DB  1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1
   maz7  DB  1,1,0,0,0,0,0,1,1,0,1,1,0,1,0,0,0,0,0,1
   maz8  DB  1,1,0,1,1,1,0,1,1,0,1,1,0,0,0,1,1,1,1,1
   maz9  DB  1,0,0,1,0,1,0,0,0,0,1,1,0,1,0,0,0,0,0,1
   maz10 DB  1,0,1,1,0,1,0,1,0,0,1,1,1,1,1,1,1,1,0,1
   maz11 DB  1,0,0,1,0,1,0,1,0,1,1,0,0,0,0,0,0,1,0,1
   maz12 DB  1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1
   maz13 DB  1,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1
   maz14 DB  1,1,0,1,0,1,0,1,0,0,0,1,1,1,0,0,0,1,0,1
   maz15 DB  1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1
   maz16 DB  1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1
   maz17 DB  1,1,0,0,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1
   maz18 DB  1,1,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0
   maz19 DB  1,1,0,0,1,1,1,1,0,0,0,1,1,1,0,0,0,1,3,1
   maz20 DB  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1

  DEFINE_SCAN_NUM
  DEFINE_PRINT_STRING
  DEFINE_PRINT_NUM
  DEFINE_PRINT_NUM_UNS 
  DEFINE_PTHIS
  DEFINE_CLEAR_SCREEN         
  
.code
start:

mov dx, offset msg
mov ah, 9 
int 21h

mov ah, 00h
int 16h

CALL CLEAR_SCREEN

pmaz1:
lea si,maz1
call print

pmaz2:
lea si,maz2
call print

pmaz3:
lea si,maz3
call print

pmaz4:
lea si,maz4
call print

pmaz5:
lea si,maz5
call print

pmaz6:
lea si,maz6
call print

pmaz7:
lea si,maz7
call print

pmaz8:
lea si,maz8
call print

pmaz9:
lea si,maz9
call print

pmaz10:
lea si,maz10
call print

pmaz11:
lea si,maz11
call print

pmaz12:
lea si,maz12
call print

pmaz13:
lea si,maz13
call print

pmaz14:
lea si,maz14
call print

pmaz15:
lea si,maz15
call print

pmaz16:
lea si,maz16
call print

pmaz17:
lea si,maz17
call print

pmaz18:
lea si,maz18
call print

pmaz19:
lea si,maz19
call print

pmaz20:
lea si,maz20
call print

endd:
             

jmp game_loop
print:
mov cx, 20

wall1:
     cmp [si], 0 
     je p1
     ;CALL   pthis
     ;DB  '#', 0
     PUTC    219      
     jmp nx1

p1:  PUTC    32       

nx1: inc si

loop wall1

PRINTN 
ret

start1:           

mov ah, 1
mov ch, 2bh
mov cl, 0bh
int 10h           

game_loop:                  

mov al, 0  
mov ah, 05h
int 10h

mov dx, maze[0]

mov ah, 02h
int 10h

mov al, 01
mov ah, 09h
mov bl, 0eh 
mov cx, 1   
int 10h

mov ax, maze[s_size * 2 - 2]
mov star, ax

call check_for_key
call no_key

gg:
call move_maze

mov dx, star

mov ah, 02h
int 10h

mov al, 04
mov ah, 09h
mov bl, 0eh 
mov cx, 1  
int 10h

check_for_key:

mov ah, 01h
int 16h
jz no_key

mov ah, 00h
int 16h

cmp al, 1bh   
je stop_game  

mov cur_dir, ah

jmp gg
no_key:

mov ah, 00h
int 1ah
cmp dx, wait_time
jb  check_for_key
add  dx, 4
mov  wait_time, dx
   
   jmp game_loop

stop_game:

mov ah, 1
mov ch, 0bh
mov cl, 0bh
int 10h

ret

move_maze proc near

wait: 
       inc keypress
                               
mov ax, 40h
mov es, ax

mov di, s_size * 2 - 2
mov cx, s_size-1

move_array:

  mov ax, maze[di-2]
  mov maze[di], ax
  sub di, 2
 loop move_array

cmp b,19
je stop

cmp cur_dir, left
  je move_left
cmp  cur_dir, right
  je move_right
cmp cur_dir, up
  je move_up
cmp cur_dir, down
  je move_down

jmp stop_move     

move_left:
  dec b 
  dec d  
  cmp a,0
  je lmaze1
  
  cmp a,1
  je lmaze2 
  
  cmp a,2
  je lmaze3 
  
  cmp a,3
  je lmaze4
  
  cmp a,4
  je lmaze5
  
  cmp a,5
  je lmaze6
  
  cmp a,6
  je lmaze7
  
  cmp a,7
  je lmaze8
  
  cmp a, 8
  je lmaze9
  
  cmp a, 9
  je lmaze10
  
  cmp a, 10
  je lmaze11
  
  cmp a,11
  je lmaze12
  
  cmp a,12   
  je lmaze13
  
  cmp a, 13              
  je lmaze14
  
  cmp a, 14                
  je lmaze15
  
  cmp a, 15                  
  je lmaze16
  
  cmp a,16                      
  je lmaze17
  
  cmp a,17                         
  je lmaze18
  
  cmp a,18                           
  je lmaze19
  
  cmp a,19
  je lmaze20

  mvlt:
  mov al, b.maze[0]
  dec al
  mov b.maze[0], al
  cmp al, -1
  jne stop_move       
  mov al, es:[4ah]    
  dec al
  mov b.maze[0], al  
  jmp stop_move

move_right:  
  
  inc b    
  
  cmp a,0
  je rmaze1
  
  cmp a,1
  je rmaze2 
  
  cmp a,2
  je rmaze3 
  
  cmp a,3
  je rmaze4
  
  cmp a,4
  je rmaze5
  
  cmp a,5
  je rmaze6
  
  cmp a,6
  je rmaze7
  
  cmp a,7
  je rmaze8
  
  cmp a, 8
  je rmaze9
  
  cmp a, 9
  je rmaze10
  
  cmp a, 10
  je rmaze11
  
  cmp a,11
  je rmaze12
  
  cmp a,12   
  je rmaze13
  
  cmp a, 13              
  je rmaze14
  
  cmp a, 14                
  je rmaze15
  
  cmp a, 15                  
  je rmaze16
  
  cmp a,16                      
  je rmaze17
  
  cmp a,17                         
  je rmaze18
  
  cmp a,18                           
  je rmaze19
  
  cmp a,19
  je rmaze20
  
  
 mvrt: 
  
  mov al, b.maze[0]
  inc al
  mov b.maze[0], al
  cmp al, es:[4ah]       
  jb  stop_move
  mov b.maze[0], 0  
  jmp stop_move

move_up:
  dec a
  dec c  
  
  cmp a,0
  je umaze1
  
  cmp a,1
  je umaze2 
  
  cmp a,2
  je umaze3 
  
  cmp a,3
  je umaze4
  
  cmp a,4
  je umaze5
  
  cmp a,5
  je umaze6
  
  cmp a,6
  je umaze7
  
  cmp a,7
  je umaze8
  
  cmp a, 8
  je umaze9
  
  cmp a, 9
  je umaze10
  
  cmp a, 10
  je umaze11
  
  cmp a,11
  je umaze12
  
  cmp a,12   
  je umaze13
  
  cmp a, 13              
  je umaze14
  
  cmp a, 14                
  je umaze15
  
  cmp a, 15                  
  je umaze16
  
  cmp a,16                      
  je umaze17
  
  cmp a,17                         
  je umaze18
  
  cmp a,18                           
  je umaze19
  
  cmp a,19
  je umaze20

  
  mvup:  
  mov al, b.maze[1]
  dec al
  mov b.maze[1], al
  cmp al, -1
  jne stop_move
  mov al, es:[84h]    
  mov b.maze[1], al  
  jmp stop_move

move_down:
  inc a
  inc c
  
    cmp a,0
  je dmaze1
  
  cmp a,1
  je dmaze2 
  
  cmp a,2
  je dmaze3 
  
  cmp a,3
  je dmaze4
  
  cmp a,4
  je dmaze5
  
  cmp a,5
  je dmaze6
  
  cmp a,6
  je dmaze7
  
  cmp a,7
  je dmaze8
  
  cmp a, 8
  je dmaze9
  
  cmp a, 9
  je dmaze10
  
  cmp a, 10
  je dmaze11
  
  cmp a,11
  je dmaze12
  
  cmp a,12   
  je dmaze13
  
  cmp a, 13              
  je dmaze14
  
  cmp a, 14                
  je dmaze15
  
  cmp a, 15                  
  je dmaze16
  
  cmp a,16                      
  je dmaze17
  
  cmp a,17                         
  je dmaze18
  
  cmp a,18                           
  je dmaze19
  
  cmp a,19
  je dmaze20

  
  mvdw:
  mov   al, b.maze[1]
  inc   al
  mov   b.maze[1], al
  cmp   al, es:[84h]   
  jbe   stop_move
  mov   b.maze[1], 0   
  jmp   stop_move

stop_move:
  ret 

lmaze1: 
lea si,maz1
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze2: 
lea si,maz2
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze3: 
lea si,maz3
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze4: 
lea si,maz4
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze5: 
lea si,maz5
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze6: 
lea si,maz6
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze7: 
lea si,maz7
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze8: 
lea si,maz8
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze9: 
lea si,maz9
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze10: 
lea si,maz10
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze11: 
lea si,maz11
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze12: 
lea si,maz12
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze13: 
lea si,maz13
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze14: 
lea si,maz14
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze15: 
lea si,maz15
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze16: 
lea si,maz16
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze17: 
lea si,maz17
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze18: 
lea si,maz18
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze19: 
lea si,maz19
add si,b
cmp [si],1h
je beepl
jmp mvlt 

lmaze20: 
lea si,maz20
add si,b
cmp [si],1h
je beepl
jmp mvlt


rmaze1: 
lea si,maz1
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze2: 
lea si,maz2
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze3: 
lea si,maz3
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze4: 
lea si,maz4
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze5: 
lea si,maz5
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze6: 
lea si,maz6
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze7: 
lea si,maz7
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze8: 
lea si,maz8
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze9: 
lea si,maz9
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze10: 
lea si,maz10
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze11: 
lea si,maz11
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze12: 
lea si,maz12
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze13: 
lea si,maz13
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze14: 
lea si,maz14
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze15: 
lea si,maz15
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze16: 
lea si,maz16
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze17: 
lea si,maz17
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze18: 
lea si,maz18
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze19: 
lea si,maz19
add si,b
cmp [si],1h
je beep
jmp mvrt 

rmaze20: 
lea si,maz20
add si,b
cmp [si],1h
je beep
jmp mvrt

  
umaze1: 
lea si,maz1
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze2: 
lea si,maz2
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze3: 
lea si,maz3
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze4: 
lea si,maz4
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze5: 
lea si,maz5
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze6: 
lea si,maz6
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze7: 
lea si,maz7
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze8: 
lea si,maz8
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze9: 
lea si,maz9
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze10: 
lea si,maz10
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze11: 
lea si,maz11
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze12: 
lea si,maz12
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze13: 
lea si,maz13
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze14: 
lea si,maz14
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze15: 
lea si,maz15
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze16: 
lea si,maz16
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze17: 
lea si,maz17
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze18: 
lea si,maz18
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze19: 
lea si,maz19
add si,b
cmp [si],1h
je beepu
jmp mvup 

umaze20: 
lea si,maz20
add si,b
cmp [si],1h
je beepu
jmp mvup


dmaze1: 
lea si,maz1
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze2: 
lea si,maz2
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze3: 
lea si,maz3
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze4: 
lea si,maz4
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze5: 
lea si,maz5
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze6: 
lea si,maz6
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze7: 
lea si,maz7
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze8: 
lea si,maz8
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze9: 
lea si,maz9
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze10: 
lea si,maz10
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze11: 
lea si,maz11
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze12: 
lea si,maz12
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze13: 
lea si,maz13
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze14: 
lea si,maz14
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze15: 
lea si,maz15
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze16: 
lea si,maz16
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze17: 
lea si,maz17
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze18: 
lea si,maz18
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze19: 
lea si,maz19
add si,b
cmp [si],1h
je beepd
jmp mvdw 

dmaze20: 
lea si,maz20
add si,b
cmp [si],1h
je beepd
jmp mvdw
  
beepl:

mov ah,02
mov dl,07h
int 21h
inc b
jmp game_loop

beep:

mov ah,02
mov dl,07h
int 21h
dec b
jmp game_loop

beepu:

mov ah,02
mov dl,07h
int 21h
inc a
jmp game_loop

beepd:

mov ah,02
mov dl,07h
int 21h
dec a
jmp game_loop
  
stop: 

call clear_screen
mov ax,0

CALL   pthis
DB  13, 10, 'Total number of moves: ',0

mov ax,keypress
call print_num

CALL   pthis
DB  13, 10, ' ',0

mov dx, offset msg1
mov ah, 9 
int 21h


msg1 db "****************CONGRATULATIONS****************"  , 0dh,0ah
     DB "**                                           **", 0dh,0ah  
     DB "**                                           **", 0dh,0ah
     DB "**                                           **", 0dh,0ah
     DB "**  **        **   ********   ***    **      **", 0dh,0ah
     DB "**   **        **      **      ** **  **     **", 0dh,0ah
     DB "**    **  ****  **      **      ** **  **    **", 0dh,0ah
     DB "**     ** **  ** **      **      **  ** **   **", 0dh,0ah
     DB "**      ***      ***    ********  **     **  **", 0dh,0ah
     DB "**                                           **", 0dh,0ah  
     DB "**                                           **", 0dh,0ah
     db "**********YOU ESCAPED FROM THE TRAP************$", 0dh,0ah   


hlt  

move_maze endp