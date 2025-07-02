const imageData =
  'data:image/png;base64,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';

const fontData = `info face="Kenney-Pixel" size=32 bold=0 italic=0 charset="" unicode=1 stretchH=100 smooth=1 aa=1 padding=1,1,1,1 spacing=1,1
common lineHeight=32 base=20 scaleW=134 scaleH=135 pages=1 packed=0
page id=0 file="Unnamed.png"
chars count=91
char id=32 x=0 y=0 width=0 height=0 xoffset=0 yoffset=0 xadvance=4 page=0 chnl=15
char id=33 x=130 y=0 width=4 height=16 xoffset=-1 yoffset=5 xadvance=4 page=0 chnl=15
char id=34 x=121 y=60 width=8 height=6 xoffset=-1 yoffset=5 xadvance=8 page=0 chnl=15
char id=35 x=82 y=68 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=36 x=17 y=27 width=12 height=20 xoffset=-1 yoffset=3 xadvance=12 page=0 chnl=15
char id=37 x=82 y=0 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=38 x=0 y=91 width=14 height=16 xoffset=-1 yoffset=5 xadvance=14 page=0 chnl=15
char id=39 x=130 y=84 width=4 height=6 xoffset=-1 yoffset=5 xadvance=4 page=0 chnl=15
char id=40 x=121 y=67 width=6 height=16 xoffset=-1 yoffset=5 xadvance=6 page=0 chnl=15
char id=41 x=121 y=84 width=6 height=16 xoffset=-1 yoffset=5 xadvance=6 page=0 chnl=15
char id=42 x=121 y=51 width=8 height=8 xoffset=1 yoffset=9 xadvance=10 page=0 chnl=15
char id=43 x=108 y=15 width=12 height=12 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=44 x=130 y=77 width=4 height=6 xoffset=-1 yoffset=17 xadvance=4 page=0 chnl=15
char id=45 x=108 y=28 width=12 height=4 xoffset=-1 yoffset=11 xadvance=12 page=0 chnl=15
char id=46 x=130 y=91 width=4 height=4 xoffset=-1 yoffset=17 xadvance=4 page=0 chnl=15
char id=47 x=82 y=34 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=48 x=0 y=108 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=49 x=108 y=82 width=8 height=16 xoffset=-1 yoffset=5 xadvance=8 page=0 chnl=15
char id=50 x=30 y=0 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=51 x=30 y=17 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=52 x=30 y=34 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=53 x=30 y=51 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=54 x=30 y=68 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=55 x=30 y=85 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=56 x=30 y=102 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=57 x=30 y=119 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=58 x=130 y=64 width=4 height=12 xoffset=-1 yoffset=9 xadvance=4 page=0 chnl=15
char id=59 x=130 y=49 width=4 height=14 xoffset=-1 yoffset=9 xadvance=4 page=0 chnl=15
char id=61 x=17 y=124 width=12 height=8 xoffset=-1 yoffset=9 xadvance=12 page=0 chnl=15
char id=63 x=82 y=17 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=64 x=82 y=51 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=65 x=43 y=68 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=66 x=43 y=85 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=67 x=43 y=102 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=68 x=43 y=119 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=69 x=56 y=0 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=70 x=56 y=17 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=71 x=56 y=34 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=72 x=56 y=51 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=73 x=108 y=116 width=8 height=16 xoffset=-1 yoffset=5 xadvance=8 page=0 chnl=15
char id=74 x=121 y=0 width=8 height=16 xoffset=-1 yoffset=5 xadvance=8 page=0 chnl=15
char id=75 x=56 y=68 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=76 x=108 y=50 width=10 height=16 xoffset=-1 yoffset=5 xadvance=10 page=0 chnl=15
char id=77 x=0 y=27 width=16 height=16 xoffset=-1 yoffset=5 xadvance=16 page=0 chnl=15
char id=78 x=56 y=85 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=79 x=56 y=102 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=80 x=56 y=119 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=81 x=17 y=105 width=12 height=18 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=82 x=69 y=0 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=83 x=69 y=17 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=84 x=69 y=34 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=85 x=69 y=51 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=86 x=69 y=68 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=87 x=0 y=44 width=16 height=16 xoffset=-1 yoffset=5 xadvance=16 page=0 chnl=15
char id=88 x=69 y=85 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=89 x=69 y=102 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=90 x=69 y=119 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=91 x=121 y=101 width=6 height=16 xoffset=-1 yoffset=5 xadvance=6 page=0 chnl=15
char id=93 x=121 y=118 width=6 height=16 xoffset=-1 yoffset=5 xadvance=6 page=0 chnl=15
char id=94 x=0 y=125 width=12 height=8 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=95 x=82 y=130 width=12 height=4 xoffset=-1 yoffset=17 xadvance=12 page=0 chnl=15
char id=97 x=82 y=85 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=98 x=17 y=48 width=12 height=18 xoffset=-1 yoffset=3 xadvance=12 page=0 chnl=15
char id=99 x=82 y=100 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=100 x=17 y=67 width=12 height=18 xoffset=-1 yoffset=3 xadvance=12 page=0 chnl=15
char id=101 x=82 y=115 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=102 x=43 y=0 width=12 height=16 xoffset=-1 yoffset=5 xadvance=12 page=0 chnl=15
char id=103 x=43 y=17 width=12 height=16 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=104 x=17 y=86 width=12 height=18 xoffset=-1 yoffset=3 xadvance=12 page=0 chnl=15
char id=105 x=130 y=34 width=4 height=14 xoffset=-1 yoffset=7 xadvance=4 page=0 chnl=15
char id=106 x=108 y=99 width=8 height=16 xoffset=-1 yoffset=7 xadvance=8 page=0 chnl=15
char id=107 x=95 y=0 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=108 x=108 y=67 width=10 height=14 xoffset=-1 yoffset=7 xadvance=10 page=0 chnl=15
char id=109 x=0 y=61 width=16 height=14 xoffset=-1 yoffset=7 xadvance=16 page=0 chnl=15
char id=110 x=95 y=15 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=111 x=95 y=30 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=112 x=95 y=45 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=113 x=43 y=34 width=12 height=16 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=114 x=95 y=60 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=115 x=95 y=75 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=116 x=108 y=33 width=10 height=16 xoffset=-1 yoffset=5 xadvance=10 page=0 chnl=15
char id=117 x=95 y=90 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=118 x=95 y=105 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=119 x=0 y=76 width=16 height=14 xoffset=-1 yoffset=7 xadvance=16 page=0 chnl=15
char id=120 x=95 y=120 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=121 x=43 y=51 width=12 height=16 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=122 x=108 y=0 width=12 height=14 xoffset=-1 yoffset=7 xadvance=12 page=0 chnl=15
char id=123 x=121 y=17 width=8 height=16 xoffset=-1 yoffset=5 xadvance=8 page=0 chnl=15
char id=124 x=130 y=17 width=4 height=16 xoffset=-1 yoffset=5 xadvance=4 page=0 chnl=15
char id=125 x=121 y=34 width=8 height=16 xoffset=-1 yoffset=5 xadvance=8 page=0 chnl=15
char id=8470 x=0 y=0 width=29 height=26 xoffset=0 yoffset=-5 xadvance=29 page=0 chnl=15`;

export const debugFontData = {
  imageData,
  fontData,
};
