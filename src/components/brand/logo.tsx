// Generated from public/brand/ares-logo.svg (approved vector redraw, outlined type).
// Colours are CSS variables so the mark works on ivory, dark theme and graphite surfaces.
import { cn } from "@/lib/utils";

type Props = { className?: string; variant?: "full" | "emblem"; tone?: "auto" | "on-dark"; title?: string };

const STOPS = {
  darkFront: [["0", "--lg-front-1"], [".44", "--lg-front-2"], ["1", "--lg-front-3"]],
  darkBack: [["0", "--lg-back-1"], ["1", "--lg-back-2"]],
  grayPlane: [["0", "--lg-gray-1"], ["1", "--lg-gray-2"]],
  darkPlane: [["0", "--lg-plane-1"], [".52", "--lg-plane-2"], ["1", "--lg-plane-3"]],
  bronze: [["0", "#d6a375"], [".5", "#b66a38"], ["1", "#7b3f25"]],
  bronzeShade: [["0", "#c0824e"], ["1", "#804321"]],
  bronzeHighlight: [["0", "#f3bf91"], [".35", "#d99058"], ["1", "#b26435"]],
  wordmark: [["0", "--lg-word-1"], ["1", "--lg-word-2"]],
  subtitle: [["0", "--lg-sub-1"], ["1", "--lg-sub-2"]],
} as const;
const DIRS: Record<string, [string, string, string, string]> = {
  darkFront: [".16", "0", ".83", "1"], darkBack: ["0", ".1", "1", "1"], grayPlane: ["0", "0", "1", "1"],
  darkPlane: ["0", "0", "1", "1"], bronze: ["0", "0", "1", "1"], bronzeShade: ["0", "0", "1", "1"],
  bronzeHighlight: [".15", "0", ".8", "1"], wordmark: ["0", "0", ".02", "1"], subtitle: ["0", "0", "0", "1"],
};

export function Logo({ className, variant = "full", tone = "auto", title = "ARES Refractory & Insulation" }: Props) {
  const p = tone === "on-dark" ? "aresd-" : "aresa-";
  const viewBox = variant === "emblem" ? "140 255 425 345" : "140 255 1385 350";
  return (
    <svg viewBox={viewBox} role="img" aria-label={title} className={cn(tone === "on-dark" ? "logo-on-dark" : "logo-auto", className)}>
      <title>{title}</title>
      <defs>
        {Object.entries(STOPS).map(([id, stops]) => {
          const [x1, y1, x2, y2] = DIRS[id]!;
          return (
            <linearGradient key={id} id={p + id} x1={x1} y1={y1} x2={x2} y2={y2}>
              {stops.map(([o, c]) => (
                <stop key={o} offset={o} style={{ stopColor: c.startsWith("--") ? `var(${c})` : c }} />
              ))}
            </linearGradient>
          );
        })}
      </defs>
      <g><g><g>
    <path d="M445 265 L525 402 Q527 410 519 406 L407 352 L389 375 L359 398 Z" fill={`url(#${p}darkBack)`}/>
    <path d="M415 522 L553 586 Q560 591 552 593 L352 593 Z" fill={`url(#${p}grayPlane)`}/>
    <path d="M411 440 L550 503 Q554 506 554 511 L554 568 Q553 575 548 571 L416 509 L354 591 L300 591 Z" fill={`url(#${p}darkPlane)`}/>
  </g>
  <g>
    <path d="M404 361 L424 368 L542 428 L542 483 Q541 488 536 485 L416 422 L334 592 L250 592 Z" fill={`url(#${p}bronze)`}/>
    <path d="M421 369 L540 428 L540 483 L417 421 Z" fill={`url(#${p}bronzeShade)`} opacity="0.95"/>
    <path d="M405 361 L421 366 L416 421 L334 592 L253 592 Z" fill={`url(#${p}bronzeHighlight)`} opacity="0.56"/>
  </g>
  <g>
    <path d="M148 588 L354 265 L445 265 L235 592 L148 592 Z" fill={`url(#${p}darkFront)`}/>
    <path d="M354 265 L444 265 L440 269 L352 269 Z" fill="#717273" opacity=".45"/>
    <path d="M147 589 L236 589 L235 592 L147 592 Z" fill="#111519"/>
  </g>
  <g fill="none" strokeLinejoin="round">
    <path d="M235 591 L403 352 L519 407" stroke="#dedbd5" strokeWidth="3.4" opacity=".8"/>
    <path d="M335 591 L415 422 L541 485" stroke="#d1cbc1" strokeWidth="3.7" opacity=".85"/>
    <path d="M354 591 L412 508 L552 572" stroke="#c9c5bc" strokeWidth="4.8" opacity=".95"/>
    <path d="M414 523 L550 587" stroke="#b8b5ae" strokeWidth="2.5" opacity=".65"/>
  </g></g>
<g><g><path d="M 605,524 L 606,528 L 662,528 L 737,396 L 743,403 L 813,528 L 863,528 L 863,512 L 763,336 L 714,335 Z" fill={`url(#${p}wordmark)`} fillRule="evenodd"/></g>
<g><path d="M 863,512 L 863,528 L 870,528 L 871,526 Z M 868,335 L 896,381 L 998,381 L 1009,386 L 1015,397 L 1015,409 L 1012,416 L 1000,424 L 881,424 L 881,528 L 934,527 L 934,471 L 936,469 L 957,469 L 1010,528 L 1071,527 L 1071,525 L 1019,469 L 1023,466 L 1038,461 L 1048,454 L 1060,439 L 1067,421 L 1069,408 L 1067,383 L 1058,362 L 1046,349 L 1033,341 L 1012,335 Z" fill={`url(#${p}wordmark)`} fillRule="evenodd"/></g>
<g><path d="M 1095,479 L 1096,528 L 1276,527 L 1275,478 Z M 1095,408 L 1096,455 L 1266,454 L 1265,407 Z M 1095,336 L 1096,382 L 1280,382 L 1280,335 Z" fill={`url(#${p}wordmark)`} fillRule="evenodd"/></g>
<g><path d="M 1317,355 L 1306,375 L 1303,391 L 1303,402 L 1307,420 L 1312,430 L 1323,442 L 1337,450 L 1361,455 L 1447,454 L 1453,456 L 1458,461 L 1459,470 L 1451,478 L 1305,478 L 1305,528 L 1461,528 L 1483,523 L 1494,517 L 1504,507 L 1513,487 L 1513,447 L 1508,434 L 1495,419 L 1478,410 L 1463,407 L 1371,407 L 1366,405 L 1361,400 L 1360,392 L 1365,384 L 1373,381 L 1480,381 L 1506,337 L 1505,335 L 1357,335 L 1338,340 L 1327,346 Z M 1280,335 L 1281,382 L 1283,375 L 1283,338 Z" fill={`url(#${p}wordmark)`} fillRule="evenodd"/></g></g>
<g><g transform="translate(595.500,595) scale(0.01904297,-0.01904297)"><path d="M165 0H393V563H697C701 563 706 563 710 563L1012 0H1271L943 602C1124 670 1215 822 1215 1022C1215 1297 1044 1490 699 1490H165ZM393 758V1295H673C893 1295 984 1190 984 1022C984 855 893 758 675 758Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(636.783,595) scale(0.01904297,-0.01904297)"><path d="M165 0H1109V196H393V655H1053V850H393V1294H1103V1490H165Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(676.313,595) scale(0.01904297,-0.01904297)"><path d="M165 0H393V620H1025V815H393V1294H1092V1490H165Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(715.311,595) scale(0.01904297,-0.01904297)"><path d="M165 0H393V563H697C701 563 706 563 710 563L1012 0H1271L943 602C1124 670 1215 822 1215 1022C1215 1297 1044 1490 699 1490H165ZM393 758V1295H673C893 1295 984 1190 984 1022C984 855 893 758 675 758Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(756.593,595) scale(0.01904297,-0.01904297)"><path d="M51 0H298L431 393H1017L1154 0H1401L861 1490H581ZM496 583 579 829C616 943 662 1098 720 1311C779 1100 824 948 864 829L950 583Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(800.256,595) scale(0.01904297,-0.01904297)"><path d="M784 -20C1113 -20 1353 188 1399 483H1169C1131 293 972 188 786 188C531 188 339 382 339 744C339 1104 530 1302 786 1302C972 1302 1131 1198 1169 1008H1398C1348 1324 1098 1510 784 1510C398 1510 113 1222 113 744C113 268 397 -20 784 -20Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(844.871,595) scale(0.01904297,-0.01904297)"><path d="M90 1294H555V0H784V1294H1247V1490H90Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(886.344,595) scale(0.01904297,-0.01904297)"><path d="M786 -20C1172 -20 1457 268 1457 744C1457 1222 1172 1510 786 1510C399 1510 113 1222 113 744C113 268 399 -20 786 -20ZM786 188C530 188 339 384 339 744C339 1105 530 1302 786 1302C1040 1302 1231 1106 1231 744C1231 384 1040 188 786 188Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(932.254,595) scale(0.01904297,-0.01904297)"><path d="M165 0H393V563H697C701 563 706 563 710 563L1012 0H1271L943 602C1124 670 1215 822 1215 1022C1215 1297 1044 1490 699 1490H165ZM393 758V1295H673C893 1295 984 1190 984 1022C984 855 893 758 675 758Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(973.537,595) scale(0.01904297,-0.01904297)"><path d="M600 0H828V593L1375 1490H1110L833 1015C789 940 753 873 716 783C679 871 643 937 597 1015L317 1490H51L600 593Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(1043.115,595) scale(0.01904297,-0.01904297)"><path d="M580 -21C713 -21 863 23 964 116L1064 0H1314L1101 254C1165 338 1225 472 1225 679H1026C1026 579 1003 490 965 416L668 769L770 844C888 931 968 1037 968 1174C968 1357 827 1505 598 1505C370 1505 221 1357 221 1155C221 1019 288 915 384 799C215 677 96 575 96 390C96 160 280 -21 580 -21ZM840 262C763 199 669 165 574 165C421 165 317 255 317 390C317 478 361 543 470 624L508 652ZM547 914C475 1002 428 1073 428 1155C428 1254 497 1321 602 1321C704 1321 766 1258 766 1172C766 1079 695 1020 639 980Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(1111.017,595) scale(0.01904297,-0.01904297)"><path d="M393 1490H165V0H393Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(1137.655,595) scale(0.01904297,-0.01904297)"><path d="M165 0H396V795C396 872 388 1026 379 1213C487 1013 544 910 617 793L1120 0H1384V1490H1153V642C1153 556 1157 417 1168 273C1102 416 1035 529 989 603L428 1490H165Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(1183.165,595) scale(0.01904297,-0.01904297)"><path d="M665 -25C1015 -25 1217 159 1217 412C1217 681 978 783 788 832L643 870C529 900 375 953 375 1094C375 1220 489 1312 670 1312C839 1312 960 1234 975 1098H1197C1190 1335 981 1510 675 1510C375 1510 147 1339 147 1081C147 877 291 752 535 687L709 639C869 596 992 545 992 415C992 271 853 175 664 175C492 175 348 251 335 414H106C120 142 330 -25 665 -25Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(1224.372,595) scale(0.01904297,-0.01904297)"><path d="M759 -23C1115 -23 1351 199 1351 512V1490H1122V531C1122 330 983 184 759 184C534 184 393 330 393 531V1490H165V512C165 199 400 -23 759 -23Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(1269.254,595) scale(0.01904297,-0.01904297)"><path d="M165 0H1068V196H393V1490H165Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(1307.318,595) scale(0.01904297,-0.01904297)"><path d="M51 0H298L431 393H1017L1154 0H1401L861 1490H581ZM496 583 579 829C616 943 662 1098 720 1311C779 1100 824 948 864 829L950 583Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(1350.981,595) scale(0.01904297,-0.01904297)"><path d="M90 1294H555V0H784V1294H1247V1490H90Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(1392.454,595) scale(0.01904297,-0.01904297)"><path d="M393 1490H165V0H393Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(1419.092,595) scale(0.01904297,-0.01904297)"><path d="M786 -20C1172 -20 1457 268 1457 744C1457 1222 1172 1510 786 1510C399 1510 113 1222 113 744C113 268 399 -20 786 -20ZM786 188C530 188 339 384 339 744C339 1105 530 1302 786 1302C1040 1302 1231 1106 1231 744C1231 384 1040 188 786 188Z" fill={`url(#${p}subtitle)`}/></g><g transform="translate(1465.002,595) scale(0.01904297,-0.01904297)"><path d="M165 0H396V795C396 872 388 1026 379 1213C487 1013 544 910 617 793L1120 0H1384V1490H1153V642C1153 556 1157 417 1168 273C1102 416 1035 529 989 603L428 1490H165Z" fill={`url(#${p}subtitle)`}/></g></g>
</g>
    </svg>
  );
}
