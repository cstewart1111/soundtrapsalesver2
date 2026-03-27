import { useState, useRef, useEffect, useCallback } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────
const SCHOOLS=[
  {id:1,district:"Cherry Creek SD",county:"Arapahoe",region:"Metro Denver",name:"Cherry Creek High School",type:"High School",grades:"9-12",city:"Greenwood Village",status:"SIGNED",score:"A",ppr:10678,frl:26,scorePts:10,scoreReasons:["Cherry Creek SD \u2014 SIGNED and active. Reference on every prospect call."],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Podcast \u00b7 STEAM",rationale:"SIGNED flagship \u2014 3,300 students. Reference on every call.",notes:"Expand to district plan",contact:{champion:"Fine Arts Director",approver:"Principal",phone:"303-773-1184",site:"ccsd.us",li:"Cherry Creek High School Fine Arts Director"}},
  {id:2,district:"Cherry Creek SD",county:"Arapahoe",region:"Metro Denver",name:"Grandview High School",type:"High School",grades:"9-12",city:"Aurora",status:"SIGNED",score:"A",ppr:10678,frl:26,scorePts:10,scoreReasons:["Cherry Creek SD \u2014 SIGNED and active. Reference on every prospect call."],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media Production",rationale:"SIGNED \u2014 active music and broadcast media programs.",notes:"",contact:{champion:"Music Dept Chair",approver:"Principal",phone:"303-773-1184",site:"ccsd.us",li:"Grandview High School Music Dept Chair"}},
  {id:3,district:"Cherry Creek SD",county:"Arapahoe",region:"Metro Denver",name:"Eaglecrest High School",type:"High School",grades:"9-12",city:"Centennial",status:"SIGNED",score:"A",ppr:10678,frl:26,scorePts:10,scoreReasons:["Cherry Creek SD \u2014 SIGNED and active. Reference on every prospect call."],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media \u00b7 STEM",rationale:"SIGNED \u2014 large active music dept.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"303-773-1184",site:"ccsd.us",li:"Eaglecrest High School Fine Arts Chair"}},
  {id:4,district:"Cherry Creek SD",county:"Arapahoe",region:"Metro Denver",name:"Overland High School",type:"High School",grades:"9-12",city:"Aurora",status:"SIGNED",score:"A",ppr:10678,frl:26,scorePts:10,scoreReasons:["Cherry Creek SD \u2014 SIGNED and active. Reference on every prospect call."],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Podcast",rationale:"SIGNED \u2014 strong performing arts.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-773-1184",site:"ccsd.us",li:"Overland High School Band Director"}},
  {id:5,district:"Cherry Creek SD",county:"Arapahoe",region:"Metro Denver",name:"Smoky Hill High School",type:"High School",grades:"9-12",city:"Aurora",status:"SIGNED",score:"A",ppr:10678,frl:26,scorePts:10,scoreReasons:["Cherry Creek SD \u2014 SIGNED and active. Reference on every prospect call."],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA Podcast",rationale:"SIGNED \u2014 active journalism + music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-773-1184",site:"ccsd.us",li:"Smoky Hill High School Music Teacher"}},
  {id:6,district:"Cherry Creek SD",county:"Arapahoe",region:"Metro Denver",name:"Infinity Middle School",type:"Middle School",grades:"6-8",city:"Aurora",status:"SIGNED",score:"A",ppr:10678,frl:26,scorePts:10,scoreReasons:["Cherry Creek SD \u2014 SIGNED and active. Reference on every prospect call."],music:true,media:false,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 STEM Cross-curricular",rationale:"SIGNED \u2014 STEM-focused. Periodic table song in use.",notes:"Expand STEM teachers",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-773-1184",site:"ccsd.us",li:"Infinity Middle School Music Teacher"}},
  {id:7,district:"Cherry Creek SD",county:"Arapahoe",region:"Metro Denver",name:"Campus Middle School",type:"Middle School",grades:"6-8",city:"Greenwood Village",status:"SIGNED",score:"A",ppr:10678,frl:26,scorePts:10,scoreReasons:["Cherry Creek SD \u2014 SIGNED and active. Reference on every prospect call."],music:true,media:false,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA Literacy",rationale:"SIGNED \u2014 strong music, ELA audio storytelling.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-773-1184",site:"ccsd.us",li:"Campus Middle School Music Teacher"}},
  {id:8,district:"Cherry Creek SD",county:"Arapahoe",region:"Metro Denver",name:"Prairie Middle School",type:"Middle School",grades:"6-8",city:"Aurora",status:"SIGNED",score:"A",ppr:10678,frl:26,scorePts:10,scoreReasons:["Cherry Creek SD \u2014 SIGNED and active. Reference on every prospect call."],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"SIGNED",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-773-1184",site:"ccsd.us",li:"Prairie Middle School Music Teacher"}},
  {id:9,district:"Cherry Creek SD",county:"Arapahoe",region:"Metro Denver",name:"Antelope Ridge Elementary",type:"Elementary",grades:"K-5",city:"Aurora",status:"SIGNED",score:"A",ppr:10678,frl:26,scorePts:10,scoreReasons:["Cherry Creek SD \u2014 SIGNED and active. Reference on every prospect call."],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"General Music \u00b7 Literacy",rationale:"SIGNED \u2014 K-5 reading fluency recording active.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-773-1184",site:"ccsd.us",li:"Antelope Ridge Elementary Music Teacher"}},
  {id:10,district:"Cherry Creek SD",county:"Arapahoe",region:"Metro Denver",name:"Cottonwood Creek Elementary",type:"Elementary",grades:"K-5",city:"Centennial",status:"SIGNED",score:"A",ppr:10678,frl:26,scorePts:10,scoreReasons:["Cherry Creek SD \u2014 SIGNED and active. Reference on every prospect call."],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"General Music \u00b7 Literacy",rationale:"SIGNED",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-773-1184",site:"ccsd.us",li:"Cottonwood Creek Elementary Music Teacher"}},
  {id:11,district:"Cherry Creek SD",county:"Arapahoe",region:"Metro Denver",name:"Heritage Elementary",type:"Elementary",grades:"K-5",city:"Centennial",status:"SIGNED",score:"A",ppr:10678,frl:26,scorePts:10,scoreReasons:["Cherry Creek SD \u2014 SIGNED and active. Reference on every prospect call."],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"General Music",rationale:"SIGNED",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-773-1184",site:"ccsd.us",li:"Heritage Elementary Music Teacher"}},
  {id:12,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"East High School",type:"High School",grades:"9-12",city:"Denver",status:"Prospect",score:"C",ppr:10979,frl:62,scorePts:2,scoreReasons:["Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "3604 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 IB Podcast \u00b7 Cross-curricular",rationale:"IB program demands cross-curricular projects. Soundtrap science/language/math lesson plans are IB-ready. Music dept + broadcast journalism = 3 depts from one subscription.",notes:"Lead with IB cross-curricular angle",contact:{champion:"Fine Arts Director",approver:"Principal",phone:"720-423-3200",site:"dpsk12.org",li:"East High School Fine Arts Director"}},
  {id:13,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"South High School",type:"High School",grades:"9-12",city:"Denver",status:"Prospect",score:"C",ppr:10979,frl:62,scorePts:2,scoreReasons:["Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media Podcast",rationale:"Active music dept + journalism program.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"720-423-3200",site:"dpsk12.org",li:"South High School Band Director"}},
  {id:14,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"North High School",type:"High School",grades:"9-12",city:"Denver",status:"Prospect",score:"C",ppr:10979,frl:62,scorePts:2,scoreReasons:["Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Strong music program in diverse community.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-423-3200",site:"dpsk12.org",li:"North High School Music Teacher"}},
  {id:15,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"George Washington High School",type:"High School",grades:"9-12",city:"Denver",status:"Prospect",score:"C",ppr:10979,frl:62,scorePts:2,scoreReasons:["Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active media + music programs.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"720-423-3200",site:"dpsk12.org",li:"George Washington High School Fine Arts Chair"}},
  {id:16,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"Manual High School",type:"High School",grades:"9-12",city:"Denver",status:"Prospect",score:"C",ppr:10979,frl:62,scorePts:2,scoreReasons:["Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Diverse school with strong music and SpEd.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-423-3200",site:"dpsk12.org",li:"Manual High School Music Teacher"}},
  {id:17,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"DSST: Stapleton",type:"Charter HS",grades:"6-12",city:"Denver",status:"Prospect",score:"B",ppr:10979,frl:62,scorePts:5,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "4503 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:false,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"STEM Podcast \u00b7 Audio Storytelling",rationale:"DSST STEM flagship. 97% stat lands perfectly with data-driven STEM admin. Charter admin buys independently. 5-campus portfolio.",notes:"Pitch as enterprise portfolio \u2014 5 campuses",contact:{champion:"STEAM Coordinator",approver:"Executive Director",phone:"720-423-3200",site:"dpsk12.org",li:"DSST: Stapleton STEAM Coordinator"}},
  {id:18,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"DSST: College View",type:"Charter HS",grades:"6-12",city:"Denver",status:"Prospect",score:"B",ppr:10979,frl:62,scorePts:5,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "4503 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:false,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"STEM Podcast \u00b7 Audio Storytelling",rationale:"DSST campus 2. Same enterprise portfolio pitch.",notes:"Portfolio play with Stapleton",contact:{champion:"STEAM Coordinator",approver:"Executive Director",phone:"720-423-3200",site:"dpsk12.org",li:"DSST: College View STEAM Coordinator"}},
  {id:19,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"DSST: Green Valley Ranch",type:"Charter HS",grades:"6-12",city:"Denver",status:"Prospect",score:"B",ppr:10979,frl:62,scorePts:5,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "3603 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:false,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"STEM Podcast",rationale:"DSST campus 3. Charter admin buys independently.",notes:"",contact:{champion:"STEAM Coordinator",approver:"Executive Director",phone:"720-423-3200",site:"dpsk12.org",li:"DSST: Green Valley Ranch STEAM Coordinator"}},
  {id:20,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"McAuliffe International School",type:"Middle School",grades:"6-8",city:"Denver",status:"Prospect",score:"C",ppr:10979,frl:62,scorePts:3,scoreReasons:["Named STEM, Arts, IB, or innovation school \u2014 curriculum program fit documented", "Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2704 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 World Language \u00b7 STEM",rationale:"Transcript supports 15+ languages \u2014 World Language + music + science = 3 depts simultaneously.",notes:"Multi-dept pitch on day one",contact:{champion:"World Language Chair",approver:"Principal",phone:"720-423-3200",site:"dpsk12.org",li:"McAuliffe International School World Language Chair"}},
  {id:21,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"KIPP NE Denver Leadership Academy",type:"Charter HS",grades:"9-12",city:"Denver",status:"Prospect",score:"B",ppr:10979,frl:62,scorePts:5,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:true,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA Podcast \u00b7 Student Voice",rationale:"KIPP mission = student voice. Students who struggle writing thrive with audio. National KIPP = enterprise play.",notes:"Equity angle + national KIPP",contact:{champion:"ELA Coach",approver:"Executive Director",phone:"720-423-3200",site:"dpsk12.org",li:"KIPP NE Denver Leadership Academy ELA Coach"}},
  {id:22,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"Denver Center for International Studies",type:"Charter K-12",grades:"K-12",city:"Denver",status:"Prospect",score:"A",ppr:10979,frl:62,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "3602 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:false,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"World Language Podcast \u00b7 ELA",rationale:"International focus. 15-language transcript = perfect for WL teachers.",notes:"",contact:{champion:"WL Dept Chair",approver:"Principal",phone:"720-423-3200",site:"dpsk12.org",li:"Denver Center for International Studies WL Dept Chair"}},
  {id:23,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"Strive Prep SMART Academy",type:"Charter HS",grades:"6-12",city:"Denver",status:"Prospect",score:"B",ppr:10979,frl:62,scorePts:5,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"STRIVE serves underserved students \u2014 audio expression use case is strong.",notes:"",contact:{champion:"ELA Teacher",approver:"Executive Director",phone:"720-423-3200",site:"dpsk12.org",li:"Strive Prep SMART Academy ELA Teacher"}},
  {id:24,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"KIPP Northeast Denver Middle School",type:"Charter MS",grades:"5-8",city:"Denver",status:"Prospect",score:"B",ppr:10979,frl:62,scorePts:5,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 Student Voice",rationale:"KIPP middle \u2014 same mission as HS.",notes:"",contact:{champion:"Music Teacher",approver:"Executive Director",phone:"720-423-3200",site:"dpsk12.org",li:"KIPP Northeast Denver Middle School Music Teacher"}},
  {id:25,district:"Denver Public Schools",county:"Denver",region:"Metro Denver",name:"Colorado High School Charter",type:"Charter HS",grades:"9-12",city:"Denver",status:"Prospect",score:"B",ppr:10979,frl:62,scorePts:5,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,979/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:false,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Podcast \u00b7 ELA",rationale:"Credit recovery charter. Podcast = student engagement tool.",notes:"",contact:{champion:"ELA Teacher",approver:"Principal",phone:"720-423-3200",site:"dpsk12.org",li:"Colorado High School Charter ELA Teacher"}},
  {id:26,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Jefferson Academy",type:"Charter K-12",grades:"K-12",city:"Broomfield",status:"Prospect",score:"B",ppr:10318,frl:30,scorePts:5,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "5404 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 STEM \u00b7 Podcast \u00b7 ELA \u2014 All Depts",rationale:"STEM charter K-12. All depts have dedicated lesson plans. 300 seats. Charter = direct purchase.",notes:"Best multi-dept K-12 play in JeffCo",contact:{champion:"Principal",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Jefferson Academy Principal"}},
  {id:27,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"D'Evelyn Jr/Sr High School",type:"Jr/Sr HS",grades:"7-12",city:"Denver",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "3604 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Podcast \u00b7 STEM",rationale:"Academic elite magnet. Strong music dept. 97% stat resonates with data-obsessed admin.",notes:"Lead with research data",contact:{champion:"Principal",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"D'Evelyn Jr/Sr High School Principal"}},
  {id:28,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Jeffco Open School",type:"K-12 Open",grades:"K-12",city:"Lakewood",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "3604 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 Cross-curricular \u00b7 Project Learning",rationale:"Progressive project-based K-12. Teachers adopt without admin push.",notes:"Find music teacher \u2014 they self-advocate",contact:{champion:"Any Teacher",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Jeffco Open School Any Teacher"}},
  {id:29,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Lakewood High School",type:"High School",grades:"9-12",city:"Lakewood",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Large HS with active music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Lakewood High School Band Director"}},
  {id:30,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Green Mountain High School",type:"High School",grades:"9-12",city:"Lakewood",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program, large enrollment.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Green Mountain High School Music Teacher"}},
  {id:31,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Ralston Valley High School",type:"High School",grades:"9-12",city:"Arvada",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Large Arvada HS with strong music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Ralston Valley High School Band Director"}},
  {id:32,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Columbine High School",type:"High School",grades:"9-12",city:"Littleton",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism. Cherry Creek is adjacent district.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Columbine High School Fine Arts Chair"}},
  {id:33,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Chatfield Senior High",type:"High School",grades:"9-12",city:"Littleton",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM",rationale:"Active music dept + strong STEM.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Chatfield Senior High Band Director"}},
  {id:34,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Bear Creek High School",type:"High School",grades:"9-12",city:"Lakewood",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active performing arts.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Bear Creek High School Music Teacher"}},
  {id:35,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Standley Lake High School",type:"High School",grades:"9-12",city:"Westminster",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Large Westminster HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Standley Lake High School Music Teacher"}},
  {id:36,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Arvada High School",type:"High School",grades:"9-12",city:"Arvada",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Established music program.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Arvada High School Band Director"}},
  {id:37,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Arvada West High School",type:"High School",grades:"9-12",city:"Arvada",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Strong performing arts tradition.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Arvada West High School Music Teacher"}},
  {id:38,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Golden High School",type:"High School",grades:"9-12",city:"Golden",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2164 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media \u00b7 STEM",rationale:"CSM proximity = STEM-forward admin.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Golden High School Fine Arts Chair"}},
  {id:39,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Wheat Ridge High School",type:"High School",grades:"9-12",city:"Wheat Ridge",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Wheat Ridge High School Music Teacher"}},
  {id:40,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Evergreen High School",type:"High School",grades:"9-12",city:"Evergreen",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Mountain community. Active arts.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Evergreen High School Band Director"}},
  {id:41,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Conifer High School",type:"High School",grades:"9-12",city:"Conifer",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Mountain area HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Conifer High School Music Teacher"}},
  {id:42,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Oberon Middle School",type:"Middle School",grades:"6-8",city:"Arvada",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Oberon Middle School Music Teacher"}},
  {id:43,district:"Jefferson County SD R-1",county:"Jefferson",region:"Metro Denver",name:"Dunstan Middle School",type:"Middle School",grades:"6-8",city:"Lakewood",status:"Prospect",score:"C",ppr:10318,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,318/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Music + SpEd use cases.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-982-6500",site:"jeffco.k12.co.us",li:"Dunstan Middle School Music Teacher"}},
  {id:44,district:"Douglas County SD",county:"Douglas",region:"Metro Denver",name:"STEM School Highlands Ranch",type:"STEM K-12",grades:"K-12",city:"Highlands Ranch",status:"Prospect",score:"A",ppr:10223,frl:9,scorePts:8,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,223/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "6303 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 9% (NCES) \u2014 affluent community, easy budget conversation"],music:false,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"STEM Podcast \u00b7 Audio Science Projects",rationale:"Named STEM school K-12. Soundtrap science lesson plans were written for this school. Charter authority. Zero budget barrier.",notes:"Show science lesson plans in demo",contact:{champion:"CEO/Principal",approver:"CEO/Principal",phone:"303-387-0100",site:"dcsdk12.org",li:"STEM School Highlands Ranch CEO/Principal"}},
  {id:45,district:"Douglas County SD",county:"Douglas",region:"Metro Denver",name:"Rock Canyon High School",type:"High School",grades:"9-12",city:"Highlands Ranch",status:"Prospect",score:"B",ppr:10223,frl:9,scorePts:4,scoreReasons:["Per-pupil spending $10,223/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "3604 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 9% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media \u00b7 STEM",rationale:"Large HS with strong music + AP programs. Cherry Creek is adjacent district.",notes:"Cherry Creek reference closes this",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"303-387-0100",site:"dcsdk12.org",li:"Rock Canyon High School Fine Arts Chair"}},
  {id:46,district:"Douglas County SD",county:"Douglas",region:"Metro Denver",name:"Highlands Ranch High School",type:"High School",grades:"9-12",city:"Highlands Ranch",status:"Prospect",score:"B",ppr:10223,frl:9,scorePts:4,scoreReasons:["Per-pupil spending $10,223/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "3603 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 9% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism. Affluent community.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-387-0100",site:"dcsdk12.org",li:"Highlands Ranch High School Band Director"}},
  {id:47,district:"Douglas County SD",county:"Douglas",region:"Metro Denver",name:"ThunderRidge High School",type:"High School",grades:"9-12",city:"Highlands Ranch",status:"Prospect",score:"B",ppr:10223,frl:9,scorePts:4,scoreReasons:["Per-pupil spending $10,223/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "3603 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 9% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Large Highlands Ranch HS.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"303-387-0100",site:"dcsdk12.org",li:"ThunderRidge High School Fine Arts Chair"}},
  {id:48,district:"Douglas County SD",county:"Douglas",region:"Metro Denver",name:"Mountain Vista High School",type:"High School",grades:"9-12",city:"Highlands Ranch",status:"Prospect",score:"B",ppr:10223,frl:9,scorePts:4,scoreReasons:["Per-pupil spending $10,223/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "3603 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 9% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media Podcast",rationale:"Highlands Ranch flagship. Cherry Creek is next door.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"303-387-0100",site:"dcsdk12.org",li:"Mountain Vista High School Fine Arts Chair"}},
  {id:49,district:"Douglas County SD",county:"Douglas",region:"Metro Denver",name:"Legend High School",type:"High School",grades:"9-12",city:"Parker",status:"Prospect",score:"B",ppr:10223,frl:9,scorePts:4,scoreReasons:["Per-pupil spending $10,223/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 9% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM",rationale:"Parker HS with music + STEM growth.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-387-0100",site:"dcsdk12.org",li:"Legend High School Band Director"}},
  {id:50,district:"Douglas County SD",county:"Douglas",region:"Metro Denver",name:"Chaparral High School",type:"High School",grades:"9-12",city:"Parker",status:"Prospect",score:"B",ppr:10223,frl:9,scorePts:4,scoreReasons:["Per-pupil spending $10,223/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 9% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Parker HS with active media program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-387-0100",site:"dcsdk12.org",li:"Chaparral High School Music Teacher"}},
  {id:51,district:"Douglas County SD",county:"Douglas",region:"Metro Denver",name:"Douglas County High School",type:"High School",grades:"9-12",city:"Castle Rock",status:"Prospect",score:"B",ppr:10223,frl:9,scorePts:4,scoreReasons:["Per-pupil spending $10,223/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 9% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Castle Rock flagship.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"303-387-0100",site:"dcsdk12.org",li:"Douglas County High School Fine Arts Chair"}},
  {id:52,district:"Douglas County SD",county:"Douglas",region:"Metro Denver",name:"Castle View High School",type:"High School",grades:"9-12",city:"Castle Rock",status:"Prospect",score:"B",ppr:10223,frl:9,scorePts:4,scoreReasons:["Per-pupil spending $10,223/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 9% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Growing Castle Rock area.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-387-0100",site:"dcsdk12.org",li:"Castle View High School Band Director"}},
  {id:53,district:"Douglas County SD",county:"Douglas",region:"Metro Denver",name:"Ponderosa High School",type:"High School",grades:"9-12",city:"Parker",status:"Prospect",score:"B",ppr:10223,frl:9,scorePts:4,scoreReasons:["Per-pupil spending $10,223/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 9% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Established Parker HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-387-0100",site:"dcsdk12.org",li:"Ponderosa High School Music Teacher"}},
  {id:54,district:"Douglas County SD",county:"Douglas",region:"Metro Denver",name:"Cresthill Middle School",type:"Middle School",grades:"6-8",city:"Highlands Ranch",status:"Prospect",score:"B",ppr:10223,frl:9,scorePts:4,scoreReasons:["Per-pupil spending $10,223/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1803 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 9% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM",rationale:"Active music + STEM cross-curricular.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-387-0100",site:"dcsdk12.org",li:"Cresthill Middle School Music Teacher"}},
  {id:55,district:"Douglas County SD",county:"Douglas",region:"Metro Denver",name:"Ranch View Middle School",type:"Middle School",grades:"6-8",city:"Highlands Ranch",status:"Prospect",score:"B",ppr:10223,frl:9,scorePts:4,scoreReasons:["Per-pupil spending $10,223/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 9% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-387-0100",site:"dcsdk12.org",li:"Ranch View Middle School Music Teacher"}},
  {id:56,district:"Adams 12 Five Star Schools",county:"Adams/Broomfield",region:"Metro Denver",name:"Stargate School",type:"Charter K-12",grades:"K-12",city:"Thornton",status:"Prospect",score:"A",ppr:10533,frl:35,scorePts:7,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "5404 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly"],music:true,media:true,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 STEM \u00b7 ELA \u00b7 Gifted Enrichment",rationale:"Gifted/STEM K-12 charter. Gifted students go deeper with Soundtrap. Charter = direct purchase.",notes:"Gifted students produce best work",contact:{champion:"Principal",approver:"Principal",phone:"720-972-4000",site:"adams12.org",li:"Stargate School Principal"}},
  {id:57,district:"Adams 12 Five Star Schools",county:"Adams/Broomfield",region:"Metro Denver",name:"Legacy High School",type:"High School",grades:"9-12",city:"Broomfield",status:"Prospect",score:"C",ppr:10533,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Podcast \u00b7 ELA",rationale:"Broomfield flagship. Active music + journalism.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-972-4000",site:"adams12.org",li:"Legacy High School Music Teacher"}},
  {id:58,district:"Adams 12 Five Star Schools",county:"Adams/Broomfield",region:"Metro Denver",name:"Horizon High School",type:"High School",grades:"9-12",city:"Thornton",status:"Prospect",score:"C",ppr:10533,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Large Thornton HS with active music.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"720-972-4000",site:"adams12.org",li:"Horizon High School Band Director"}},
  {id:59,district:"Adams 12 Five Star Schools",county:"Adams/Broomfield",region:"Metro Denver",name:"Mountain Range High School",type:"High School",grades:"9-12",city:"Westminster",status:"Prospect",score:"C",ppr:10533,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"720-972-4000",site:"adams12.org",li:"Mountain Range High School Fine Arts Chair"}},
  {id:60,district:"Adams 12 Five Star Schools",county:"Adams/Broomfield",region:"Metro Denver",name:"Northglenn High School",type:"High School",grades:"9-12",city:"Northglenn",status:"Prospect",score:"C",ppr:10533,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active performing arts.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-972-4000",site:"adams12.org",li:"Northglenn High School Music Teacher"}},
  {id:61,district:"Adams 12 Five Star Schools",county:"Adams/Broomfield",region:"Metro Denver",name:"Thornton High School",type:"High School",grades:"9-12",city:"Thornton",status:"Prospect",score:"C",ppr:10533,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Diverse community. SpEd use case is strong.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-972-4000",site:"adams12.org",li:"Thornton High School Music Teacher"}},
  {id:62,district:"Adams 12 Five Star Schools",county:"Adams/Broomfield",region:"Metro Denver",name:"York International K-8",type:"Charter K-8",grades:"K-8",city:"Thornton",status:"Prospect",score:"A",ppr:10533,frl:35,scorePts:7,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly"],music:false,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"World Language Podcast \u00b7 ELA",rationale:"International focus. 15-language transcript.",notes:"",contact:{champion:"WL Teacher",approver:"Principal",phone:"720-972-4000",site:"adams12.org",li:"York International K-8 WL Teacher"}},
  {id:63,district:"Adams 12 Five Star Schools",county:"Adams/Broomfield",region:"Metro Denver",name:"Westlake Middle School",type:"Middle School",grades:"6-8",city:"Thornton",status:"Prospect",score:"C",ppr:10533,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-972-4000",site:"adams12.org",li:"Westlake Middle School Music Teacher"}},
  {id:64,district:"Adams 12 Five Star Schools",county:"Adams/Broomfield",region:"Metro Denver",name:"Rocky Top Middle School",type:"Middle School",grades:"6-8",city:"Broomfield",status:"Prospect",score:"C",ppr:10533,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1443 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly"],music:true,media:false,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM",rationale:"Music + STEM cross-curricular.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-972-4000",site:"adams12.org",li:"Rocky Top Middle School Music Teacher"}},
  {id:65,district:"Aurora Public Schools",county:"Arapahoe",region:"Metro Denver",name:"Vista PEAK Preparatory",type:"High School",grades:"9-12",city:"Aurora",status:"Prospect",score:"C",ppr:11552,frl:68,scorePts:3,scoreReasons:["Per-pupil spending $11,552/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "3604 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 68% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM \u00b7 Podcast",rationale:"Modern campus, STEM + exploration focus. Cherry Creek is adjacent.",notes:"Cherry Creek reference is instant",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-344-8060",site:"aurorak12.org",li:"Vista PEAK Preparatory Music Teacher"}},
  {id:66,district:"Aurora Public Schools",county:"Arapahoe",region:"Metro Denver",name:"Aurora Central High School",type:"High School",grades:"9-12",city:"Aurora",status:"Prospect",score:"C",ppr:11552,frl:68,scorePts:3,scoreReasons:["Per-pupil spending $11,552/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 68% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Diverse Aurora HS. SpEd + ELA audio use cases strong.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-344-8060",site:"aurorak12.org",li:"Aurora Central High School Music Teacher"}},
  {id:67,district:"Aurora Public Schools",county:"Arapahoe",region:"Metro Denver",name:"Hinkley High School",type:"High School",grades:"9-12",city:"Aurora",status:"Prospect",score:"C",ppr:11552,frl:68,scorePts:3,scoreReasons:["Per-pupil spending $11,552/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 68% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Diverse community, strong music.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-344-8060",site:"aurorak12.org",li:"Hinkley High School Band Director"}},
  {id:68,district:"Aurora Public Schools",county:"Arapahoe",region:"Metro Denver",name:"Rangeview High School",type:"High School",grades:"9-12",city:"Aurora",status:"Prospect",score:"C",ppr:11552,frl:68,scorePts:3,scoreReasons:["Per-pupil spending $11,552/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 68% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism program.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"303-344-8060",site:"aurorak12.org",li:"Rangeview High School Fine Arts Chair"}},
  {id:69,district:"Aurora Public Schools",county:"Arapahoe",region:"Metro Denver",name:"Gateway High School",type:"High School",grades:"9-12",city:"Aurora",status:"Prospect",score:"C",ppr:11552,frl:68,scorePts:3,scoreReasons:["Per-pupil spending $11,552/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 68% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Serves diverse/at-risk students. Audio expression = strong pitch.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-344-8060",site:"aurorak12.org",li:"Gateway High School Music Teacher"}},
  {id:70,district:"Aurora Public Schools",county:"Arapahoe",region:"Metro Denver",name:"South Middle School",type:"Middle School",grades:"6-8",city:"Aurora",status:"Prospect",score:"C",ppr:11552,frl:68,scorePts:3,scoreReasons:["Per-pupil spending $11,552/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 68% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 SpEd",rationale:"Music + SpEd use cases.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-344-8060",site:"aurorak12.org",li:"South Middle School Music Teacher"}},
  {id:71,district:"Littleton Public Schools",county:"Arapahoe",region:"Metro Denver",name:"Arapahoe High School",type:"High School",grades:"9-12",city:"Centennial",status:"Prospect",score:"B",ppr:10177,frl:17,scorePts:4,scoreReasons:["Per-pupil spending $10,177/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 17% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media Podcast",rationale:"Cherry Creek-adjacent. Best CC social proof comp in Arapahoe County.",notes:"Lead with Cherry Creek as peer district",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"303-347-3300",site:"lps.k12.co.us",li:"Arapahoe High School Fine Arts Chair"}},
  {id:72,district:"Littleton Public Schools",county:"Arapahoe",region:"Metro Denver",name:"Heritage High School",type:"High School",grades:"9-12",city:"Littleton",status:"Prospect",score:"B",ppr:10177,frl:17,scorePts:4,scoreReasons:["Per-pupil spending $10,177/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 17% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Strong music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-347-3300",site:"lps.k12.co.us",li:"Heritage High School Music Teacher"}},
  {id:73,district:"Littleton Public Schools",county:"Arapahoe",region:"Metro Denver",name:"Littleton High School",type:"High School",grades:"9-12",city:"Littleton",status:"Prospect",score:"B",ppr:10177,frl:17,scorePts:4,scoreReasons:["Per-pupil spending $10,177/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2163 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 17% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active performing arts + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-347-3300",site:"lps.k12.co.us",li:"Littleton High School Band Director"}},
  {id:74,district:"Littleton Public Schools",county:"Arapahoe",region:"Metro Denver",name:"Powell Middle School",type:"Middle School",grades:"6-8",city:"Littleton",status:"Prospect",score:"B",ppr:10177,frl:17,scorePts:4,scoreReasons:["Per-pupil spending $10,177/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 17% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-347-3300",site:"lps.k12.co.us",li:"Powell Middle School Music Teacher"}},
  {id:75,district:"Littleton Public Schools",county:"Arapahoe",region:"Metro Denver",name:"Newton Middle School",type:"Middle School",grades:"6-8",city:"Littleton",status:"Prospect",score:"B",ppr:10177,frl:17,scorePts:4,scoreReasons:["Per-pupil spending $10,177/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 17% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Music program active.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-347-3300",site:"lps.k12.co.us",li:"Newton Middle School Music Teacher"}},
  {id:76,district:"Englewood Schools",county:"Arapahoe",region:"Metro Denver",name:"Englewood High School",type:"High School",grades:"9-12",city:"Englewood",status:"Prospect",score:"B",ppr:11129,frl:55,scorePts:4,scoreReasons:["Per-pupil spending $11,129/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Active music + SpEd. Cherry Creek proximity.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-761-7050",site:"englewoodschools.net",li:"Englewood High School Music Teacher"}},
  {id:77,district:"Englewood Schools",county:"Arapahoe",region:"Metro Denver",name:"Englewood Middle School",type:"Middle School",grades:"6-8",city:"Englewood",status:"Prospect",score:"B",ppr:11129,frl:55,scorePts:4,scoreReasons:["Per-pupil spending $11,129/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 SpEd",rationale:"Music + SpEd use cases.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-761-7050",site:"englewoodschools.net",li:"Englewood Middle School Music Teacher"}},
  {id:78,district:"Mapleton Public Schools",county:"Adams",region:"Metro Denver",name:"Mapleton Expeditionary Sch. of the Arts",type:"High School",grades:"9-12",city:"Denver",status:"Prospect",score:"B",ppr:11163,frl:75,scorePts:4,scoreReasons:["Named STEM, Arts, IB, or innovation school \u2014 curriculum program fit documented", "Per-pupil spending $11,163/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 75% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:true,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 Arts \u00b7 ELA Podcast",rationale:"Named arts school. Walk in and demo it \u2014 every teacher will want it.",notes:"Show up, demo it, sign",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-853-1000",site:"mapleton.k12.co.us",li:"Mapleton Expeditionary Sch. of the Arts Music Teacher"}},
  {id:79,district:"Mapleton Public Schools",county:"Adams",region:"Metro Denver",name:"York International K-8 Mapleton",type:"Charter K-8",grades:"K-8",city:"Northglenn",status:"Prospect",score:"A",ppr:11163,frl:75,scorePts:7,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $11,163/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 75% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:false,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"World Language \u00b7 ELA",rationale:"International focus. 15-language transcript.",notes:"",contact:{champion:"WL Teacher",approver:"Principal",phone:"303-853-1000",site:"mapleton.k12.co.us",li:"York International K-8 Mapleton WL Teacher"}},
  {id:80,district:"Mapleton Public Schools",county:"Adams",region:"Metro Denver",name:"Global Village Academy Northglenn",type:"Charter K-8",grades:"K-8",city:"Northglenn",status:"Prospect",score:"A",ppr:11163,frl:75,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $11,163/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 75% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:false,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"World Language Podcast",rationale:"Immersion languages school. 15-language transcript is the pitch.",notes:"",contact:{champion:"WL Dept Chair",approver:"Principal",phone:"303-853-1000",site:"mapleton.k12.co.us",li:"Global Village Academy Northglenn WL Dept Chair"}},
  {id:81,district:"Westminster Public Schools",county:"Adams",region:"Metro Denver",name:"Westminster High School",type:"High School",grades:"9-12",city:"Westminster",status:"Prospect",score:"C",ppr:11163,frl:72,scorePts:2,scoreReasons:["Per-pupil spending $11,163/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 72% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-428-3511",site:"westminsterpublicschools.org",li:"Westminster High School Band Director"}},
  {id:82,district:"Westminster Public Schools",county:"Adams",region:"Metro Denver",name:"STEM Launch Charter",type:"Charter K-8",grades:"K-8",city:"Westminster",status:"Prospect",score:"A",ppr:11163,frl:72,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $11,163/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2163 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 72% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:false,media:true,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"STEM Podcast \u00b7 ELA \u00b7 SpEd",rationale:"STEM K-8 charter. COPPA compliance pitch for K-8.",notes:"",contact:{champion:"STEM Coordinator",approver:"Principal",phone:"303-428-3511",site:"westminsterpublicschools.org",li:"STEM Launch Charter STEM Coordinator"}},
  {id:83,district:"Westminster Public Schools",county:"Adams",region:"Metro Denver",name:"Thinker K-8 STEM Charter",type:"Charter K-8",grades:"K-8",city:"Westminster",status:"Prospect",score:"A",ppr:11163,frl:72,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $11,163/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 72% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 STEM \u00b7 ELA",rationale:"STEM K-8 charter. COPPA walled garden is key pitch.",notes:"COPPA compliance = key differentiator",contact:{champion:"Principal",approver:"Principal",phone:"303-428-3511",site:"westminsterpublicschools.org",li:"Thinker K-8 STEM Charter Principal"}},
  {id:84,district:"Brighton 27J",county:"Adams",region:"Metro Denver",name:"Brighton High School",type:"High School",grades:"9-12",city:"Brighton",status:"Prospect",score:"C",ppr:10533,frl:45,scorePts:2,scoreReasons:["Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism in growing Adams County.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-655-2900",site:"sd27j.org",li:"Brighton High School Band Director"}},
  {id:85,district:"Brighton 27J",county:"Adams",region:"Metro Denver",name:"Riverdale Ridge High School",type:"High School",grades:"9-12",city:"Brighton",status:"Prospect",score:"C",ppr:10533,frl:45,scorePts:2,scoreReasons:["Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Newer HS with modern purchasing mindset.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"303-655-2900",site:"sd27j.org",li:"Riverdale Ridge High School Fine Arts Chair"}},
  {id:86,district:"Brighton 27J",county:"Adams",region:"Metro Denver",name:"Overland Trail Middle School",type:"Middle School",grades:"6-8",city:"Brighton",status:"Prospect",score:"C",ppr:10533,frl:45,scorePts:2,scoreReasons:["Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-655-2900",site:"sd27j.org",li:"Overland Trail Middle School Music Teacher"}},
  {id:87,district:"Brighton 27J",county:"Adams",region:"Metro Denver",name:"Bromley East Charter School",type:"Charter K-8",grades:"K-8",city:"Brighton",status:"Prospect",score:"B",ppr:10533,frl:45,scorePts:5,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,533/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Charter K-8.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-655-2900",site:"sd27j.org",li:"Bromley East Charter School Music Teacher"}},
  {id:88,district:"Adams County SD 14",county:"Adams",region:"Metro Denver",name:"Adams City High School",type:"High School",grades:"9-12",city:"Commerce City",status:"Prospect",score:"C",ppr:11308,frl:82,scorePts:3,scoreReasons:["Per-pupil spending $11,308/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 82% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Diverse community. SpEd + ELA audio expression strong use case.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-853-3333",site:"adams14.org",li:"Adams City High School Music Teacher"}},
  {id:89,district:"Adams County SD 14",county:"Adams",region:"Metro Denver",name:"Central High School Adams 14",type:"High School",grades:"9-12",city:"Commerce City",status:"Prospect",score:"C",ppr:11308,frl:82,scorePts:3,scoreReasons:["Per-pupil spending $11,308/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "Adjacent/same metro as Cherry Creek SD \u2014 peer district social proof applies directly", "District FRL 82% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Bilingual community. World Language + ELA pitch.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-853-3333",site:"adams14.org",li:"Central High School Adams 14 Music Teacher"}},
  {id:90,district:"Boulder Valley SD",county:"Boulder",region:"Boulder / Broomfield",name:"Peak to Peak Charter School",type:"Charter K-12",grades:"K-12",city:"Lafayette",status:"Prospect",score:"A",ppr:10489,frl:18,scorePts:7,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,489/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "5404 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM \u00b7 Podcast",rationale:"Top-ranked CO charter. Music + STEM + ELA. Spotify ownership resonates with Boulder.",notes:"Spotify brand opens doors in Boulder",contact:{champion:"Executive Director",approver:"Executive Director",phone:"720-561-5000",site:"bvsd.org",li:"Peak to Peak Charter School Executive Director"}},
  {id:91,district:"Boulder Valley SD",county:"Boulder",region:"Boulder / Broomfield",name:"Boulder High School",type:"High School",grades:"9-12",city:"Boulder",status:"Prospect",score:"C",ppr:10489,frl:18,scorePts:3,scoreReasons:["Per-pupil spending $10,489/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "3604 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 IB Podcast \u00b7 World Language",rationale:"IB program + 5+ WL offerings. Transcript supports 15 languages.",notes:"Two-contact pitch: Music + WL Chair",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-561-5000",site:"bvsd.org",li:"Boulder High School Music Teacher"}},
  {id:92,district:"Boulder Valley SD",county:"Boulder",region:"Boulder / Broomfield",name:"Fairview High School",type:"High School",grades:"9-12",city:"Boulder",status:"Prospect",score:"C",ppr:10489,frl:18,scorePts:3,scoreReasons:["Per-pupil spending $10,489/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "3604 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM \u00b7 Podcast",rationale:"Boulder flagship. Sophisticated EdTech buyers. Strong sciences.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"720-561-5000",site:"bvsd.org",li:"Fairview High School Fine Arts Chair"}},
  {id:93,district:"Boulder Valley SD",county:"Boulder",region:"Boulder / Broomfield",name:"Monarch High School",type:"High School",grades:"9-12",city:"Louisville",status:"Prospect",score:"C",ppr:10489,frl:18,scorePts:3,scoreReasons:["Per-pupil spending $10,489/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program in growing Louisville community.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"720-561-5000",site:"bvsd.org",li:"Monarch High School Band Director"}},
  {id:94,district:"Boulder Valley SD",county:"Boulder",region:"Boulder / Broomfield",name:"Centaurus High School",type:"High School",grades:"9-12",city:"Lafayette",status:"Prospect",score:"C",ppr:10489,frl:18,scorePts:3,scoreReasons:["Per-pupil spending $10,489/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-561-5000",site:"bvsd.org",li:"Centaurus High School Music Teacher"}},
  {id:95,district:"Boulder Valley SD",county:"Boulder",region:"Boulder / Broomfield",name:"Broomfield High School",type:"High School",grades:"9-12",city:"Broomfield",status:"Prospect",score:"C",ppr:10489,frl:18,scorePts:3,scoreReasons:["Per-pupil spending $10,489/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"720-561-5000",site:"bvsd.org",li:"Broomfield High School Band Director"}},
  {id:96,district:"Boulder Valley SD",county:"Boulder",region:"Boulder / Broomfield",name:"Erie High School",type:"High School",grades:"9-12",city:"Erie",status:"Prospect",score:"C",ppr:10489,frl:18,scorePts:3,scoreReasons:["Per-pupil spending $10,489/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM",rationale:"Growing Erie community. Active music + STEM.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-561-5000",site:"bvsd.org",li:"Erie High School Music Teacher"}},
  {id:97,district:"Boulder Valley SD",county:"Boulder",region:"Boulder / Broomfield",name:"Manhattan Middle School of the Arts",type:"Middle School",grades:"6-8",city:"Boulder",status:"Prospect",score:"B",ppr:10489,frl:18,scorePts:4,scoreReasons:["Named STEM, Arts, IB, or innovation school \u2014 curriculum program fit documented", "Per-pupil spending $10,489/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2163 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 Arts Integration \u00b7 ELA",rationale:"Named arts school. Music teachers champion before you finish the pitch.",notes:"Name of school closes the conversation",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-561-5000",site:"bvsd.org",li:"Manhattan Middle School of the Arts Music Teacher"}},
  {id:98,district:"Boulder Valley SD",county:"Boulder",region:"Boulder / Broomfield",name:"Angevine Middle School",type:"Middle School",grades:"6-8",city:"Lafayette",status:"Prospect",score:"C",ppr:10489,frl:18,scorePts:3,scoreReasons:["Per-pupil spending $10,489/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-561-5000",site:"bvsd.org",li:"Angevine Middle School Music Teacher"}},
  {id:99,district:"Boulder Valley SD",county:"Boulder",region:"Boulder / Broomfield",name:"Louisville Middle School",type:"Middle School",grades:"6-8",city:"Louisville",status:"Prospect",score:"C",ppr:10489,frl:18,scorePts:3,scoreReasons:["Per-pupil spending $10,489/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Growing Louisville community.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"720-561-5000",site:"bvsd.org",li:"Louisville Middle School Music Teacher"}},
  {id:100,district:"St. Vrain Valley SD",county:"Boulder/Weld",region:"Boulder / Broomfield",name:"Innovation Center",type:"Career/STEM",grades:"9-12",city:"Longmont",status:"Prospect",score:"A",ppr:10500,frl:38,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,500/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:false,media:true,stem:true,ela:false,sped:false,lms:"Google Classroom",useCase:"STEM Podcast \u00b7 Career Audio Projects",rationale:"Newest SVVSD facility. Career audio projects = workforce readiness. Blank slate purchasing.",notes:"Modern facility = modern tools budget",contact:{champion:"Center Director",approver:"Center Director",phone:"303-776-6200",site:"svvsd.org",li:"Innovation Center Center Director"}},
  {id:101,district:"St. Vrain Valley SD",county:"Boulder/Weld",region:"Boulder / Broomfield",name:"Skyline High School",type:"High School",grades:"9-12",city:"Longmont",status:"Prospect",score:"C",ppr:10500,frl:38,scorePts:2,scoreReasons:["Per-pupil spending $10,500/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism in Longmont.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-776-6200",site:"svvsd.org",li:"Skyline High School Band Director"}},
  {id:102,district:"St. Vrain Valley SD",county:"Boulder/Weld",region:"Boulder / Broomfield",name:"Longmont High School",type:"High School",grades:"9-12",city:"Longmont",status:"Prospect",score:"C",ppr:10500,frl:38,scorePts:2,scoreReasons:["Per-pupil spending $10,500/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Podcast",rationale:"Active music + journalism. Win SVVSD = 17 schools.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-776-6200",site:"svvsd.org",li:"Longmont High School Band Director"}},
  {id:103,district:"St. Vrain Valley SD",county:"Boulder/Weld",region:"Boulder / Broomfield",name:"Silver Creek High School",type:"High School",grades:"9-12",city:"Longmont",status:"Prospect",score:"C",ppr:10500,frl:38,scorePts:2,scoreReasons:["Per-pupil spending $10,500/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM",rationale:"Strong music + STEM programs.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-776-6200",site:"svvsd.org",li:"Silver Creek High School Music Teacher"}},
  {id:104,district:"St. Vrain Valley SD",county:"Boulder/Weld",region:"Boulder / Broomfield",name:"Niwot High School",type:"High School",grades:"9-12",city:"Niwot",status:"Prospect",score:"C",ppr:10500,frl:38,scorePts:2,scoreReasons:["Per-pupil spending $10,500/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2163 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM",rationale:"Boulder County HS. Strong academics.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"303-776-6200",site:"svvsd.org",li:"Niwot High School Fine Arts Chair"}},
  {id:105,district:"St. Vrain Valley SD",county:"Boulder/Weld",region:"Boulder / Broomfield",name:"Mead High School",type:"High School",grades:"9-12",city:"Mead",status:"Prospect",score:"C",ppr:10500,frl:38,scorePts:2,scoreReasons:["Per-pupil spending $10,500/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Growing Mead community.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"303-776-6200",site:"svvsd.org",li:"Mead High School Band Director"}},
  {id:106,district:"St. Vrain Valley SD",county:"Boulder/Weld",region:"Boulder / Broomfield",name:"Frederick High School",type:"High School",grades:"9-12",city:"Frederick",status:"Prospect",score:"C",ppr:10500,frl:38,scorePts:2,scoreReasons:["Per-pupil spending $10,500/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Growing Frederick area.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-776-6200",site:"svvsd.org",li:"Frederick High School Music Teacher"}},
  {id:107,district:"St. Vrain Valley SD",county:"Boulder/Weld",region:"Boulder / Broomfield",name:"Sunset Middle School",type:"Middle School",grades:"6-8",city:"Longmont",status:"Prospect",score:"C",ppr:10500,frl:38,scorePts:2,scoreReasons:["Per-pupil spending $10,500/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-776-6200",site:"svvsd.org",li:"Sunset Middle School Music Teacher"}},
  {id:108,district:"Poudre School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Fossil Ridge High School",type:"High School",grades:"9-12",city:"Fort Collins",status:"Prospect",score:"C",ppr:10600,frl:22,scorePts:2,scoreReasons:["Per-pupil spending $10,600/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "3604 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Podcast \u00b7 STEM",rationale:"Largest PSD campus. CSU proximity = tech-forward admin. Win PSD = 17-school deal.",notes:"Band Director self-advocates after 10-min demo",contact:{champion:"Band Director",approver:"Fine Arts Director",phone:"970-490-0001",site:"psdschools.org",li:"Fossil Ridge High School Band Director"}},
  {id:109,district:"Poudre School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Liberty Common School",type:"Charter K-12",grades:"K-12",city:"Fort Collins",status:"Prospect",score:"A",ppr:10600,frl:22,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,600/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "3603 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 Core Knowledge Cross-curricular",rationale:"Core Knowledge charter. Soundtrap history/science songs = perfect CK supplement. COPPA = critical for conservative parent base.",notes:"COPPA compliance wins here",contact:{champion:"Principal",approver:"Principal",phone:"970-490-0001",site:"psdschools.org",li:"Liberty Common School Principal"}},
  {id:110,district:"Poudre School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Fort Collins High School",type:"High School",grades:"9-12",city:"Fort Collins",status:"Prospect",score:"C",ppr:10600,frl:22,scorePts:2,scoreReasons:["Per-pupil spending $10,600/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism. CSU-adjacent = sophisticated admin.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-490-0001",site:"psdschools.org",li:"Fort Collins High School Band Director"}},
  {id:111,district:"Poudre School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Poudre High School",type:"High School",grades:"9-12",city:"Fort Collins",status:"Prospect",score:"C",ppr:10600,frl:22,scorePts:2,scoreReasons:["Per-pupil spending $10,600/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Podcast",rationale:"Part of PSD district deal play.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-490-0001",site:"psdschools.org",li:"Poudre High School Band Director"}},
  {id:112,district:"Poudre School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Rocky Mountain High School",type:"High School",grades:"9-12",city:"Fort Collins",status:"Prospect",score:"C",ppr:10600,frl:22,scorePts:2,scoreReasons:["Per-pupil spending $10,600/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media Podcast",rationale:"Fort Collins flagship. Music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Fine Arts Director",phone:"970-490-0001",site:"psdschools.org",li:"Rocky Mountain High School Band Director"}},
  {id:113,district:"Poudre School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Centennial High School Fort Collins",type:"Alternative HS",grades:"9-12",city:"Fort Collins",status:"Prospect",score:"C",ppr:10600,frl:22,scorePts:2,scoreReasons:["Per-pupil spending $10,600/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Alternative HS. Audio expression = key use case.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-490-0001",site:"psdschools.org",li:"Centennial High School Fort Collins Music Teacher"}},
  {id:114,district:"Poudre School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Cache La Poudre K-8",type:"K-8",grades:"K-8",city:"Fort Collins",status:"Prospect",score:"C",ppr:10600,frl:22,scorePts:2,scoreReasons:["Per-pupil spending $10,600/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"K-8 school. COPPA compliance is key.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-490-0001",site:"psdschools.org",li:"Cache La Poudre K-8 Music Teacher"}},
  {id:115,district:"Poudre School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Lesher Middle School",type:"Middle School",grades:"6-8",city:"Fort Collins",status:"Prospect",score:"C",ppr:10600,frl:22,scorePts:2,scoreReasons:["Per-pupil spending $10,600/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-490-0001",site:"psdschools.org",li:"Lesher Middle School Music Teacher"}},
  {id:116,district:"Poudre School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Wellington Middle-High School",type:"Jr/Sr HS",grades:"7-12",city:"Wellington",status:"Prospect",score:"C",ppr:10600,frl:22,scorePts:2,scoreReasons:["Per-pupil spending $10,600/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Rural Larimer area.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-490-0001",site:"psdschools.org",li:"Wellington Middle-High School Music Teacher"}},
  {id:117,district:"Thompson School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Mountain View High School Loveland",type:"High School",grades:"9-12",city:"Loveland",status:"Prospect",score:"C",ppr:10400,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism in Loveland.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-613-5000",site:"thompsonschools.org",li:"Mountain View High School Loveland Band Director"}},
  {id:118,district:"Thompson School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Loveland High School",type:"High School",grades:"9-12",city:"Loveland",status:"Prospect",score:"C",ppr:10400,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"970-613-5000",site:"thompsonschools.org",li:"Loveland High School Fine Arts Chair"}},
  {id:119,district:"Thompson School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Berthoud High School",type:"High School",grades:"9-12",city:"Berthoud",status:"Prospect",score:"C",ppr:10400,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Growing Berthoud area.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-613-5000",site:"thompsonschools.org",li:"Berthoud High School Music Teacher"}},
  {id:120,district:"Thompson School District",county:"Larimer",region:"Fort Collins / Larimer",name:"Bill Reed Middle School",type:"Middle School",grades:"6-8",city:"Loveland",status:"Prospect",score:"C",ppr:10400,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-613-5000",site:"thompsonschools.org",li:"Bill Reed Middle School Music Teacher"}},
  {id:121,district:"Academy District 20",county:"El Paso",region:"Colorado Springs",name:"Discovery Canyon Campus HS",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"B",ppr:10070,frl:8,scorePts:4,scoreReasons:["Named STEM, Arts, IB, or innovation school \u2014 curriculum program fit documented", "Per-pupil spending $10,070/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "4504 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 8% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Canvas",useCase:"IB Music \u00b7 Podcast \u00b7 STEM",rationale:"IB + STEM flagship. Canvas live. IB Music requires composition tech \u2014 Soundtrap IS the tool. IB Science + Language A have matching lesson plans.",notes:"IB Music curriculum alignment = killer pitch",contact:{champion:"IB Coordinator",approver:"Principal",phone:"719-234-1200",site:"asd20.org",li:"Discovery Canyon Campus HS IB Coordinator"}},
  {id:122,district:"Academy District 20",county:"El Paso",region:"Colorado Springs",name:"Air Academy High School",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10070,frl:8,scorePts:3,scoreReasons:["Per-pupil spending $10,070/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "3604 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 8% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Canvas",useCase:"Music \u00b7 Podcast \u00b7 JROTC Cross-curricular",rationale:"JROTC culture values communication \u2014 podcast maps to their mission. Canvas-ready.",notes:"Band Director is the champion",contact:{champion:"Band Director",approver:"Principal",phone:"719-234-1200",site:"asd20.org",li:"Air Academy High School Band Director"}},
  {id:123,district:"Academy District 20",county:"El Paso",region:"Colorado Springs",name:"Rampart High School",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10070,frl:8,scorePts:3,scoreReasons:["Per-pupil spending $10,070/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 8% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Canvas",useCase:"Music \u00b7 Media",rationale:"Active music + journalism. Canvas-ready.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"719-234-1200",site:"asd20.org",li:"Rampart High School Fine Arts Chair"}},
  {id:124,district:"Academy District 20",county:"El Paso",region:"Colorado Springs",name:"Pine Creek High School",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10070,frl:8,scorePts:3,scoreReasons:["Per-pupil spending $10,070/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 8% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Canvas",useCase:"Music \u00b7 Media",rationale:"Active music + journalism. Canvas-ready.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"719-234-1200",site:"asd20.org",li:"Pine Creek High School Band Director"}},
  {id:125,district:"Academy District 20",county:"El Paso",region:"Colorado Springs",name:"Liberty High School D20",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10070,frl:8,scorePts:3,scoreReasons:["Per-pupil spending $10,070/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 8% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Canvas",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-234-1200",site:"asd20.org",li:"Liberty High School D20 Music Teacher"}},
  {id:126,district:"Academy District 20",county:"El Paso",region:"Colorado Springs",name:"Challenger Middle School",type:"Middle School",grades:"6-8",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10070,frl:8,scorePts:3,scoreReasons:["Per-pupil spending $10,070/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2163 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 8% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 STEM \u00b7 SpEd",rationale:"D20 STEM middle school. Music + STEM cross-curricular.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-234-1200",site:"asd20.org",li:"Challenger Middle School Music Teacher"}},
  {id:127,district:"Academy District 20",county:"El Paso",region:"Colorado Springs",name:"Discovery Canyon Campus MS",type:"Middle School",grades:"6-8",city:"Colorado Springs",status:"Prospect",score:"B",ppr:10070,frl:8,scorePts:4,scoreReasons:["Named STEM, Arts, IB, or innovation school \u2014 curriculum program fit documented", "Per-pupil spending $10,070/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2163 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 8% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:true,ela:true,sped:false,lms:"Canvas",useCase:"Music \u00b7 STEM",rationale:"IB + STEM pipeline school.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-234-1200",site:"asd20.org",li:"Discovery Canyon Campus MS Music Teacher"}},
  {id:128,district:"Academy District 20",county:"El Paso",region:"Colorado Springs",name:"Chinook Trail Middle School",type:"Middle School",grades:"6-8",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10070,frl:8,scorePts:3,scoreReasons:["Per-pupil spending $10,070/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 8% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Canvas",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-234-1200",site:"asd20.org",li:"Chinook Trail Middle School Music Teacher"}},
  {id:129,district:"Colorado Springs D11",county:"El Paso",region:"Colorado Springs",name:"Galileo School of Math & Science",type:"Charter K-12",grades:"K-12",city:"Colorado Springs",status:"Prospect",score:"A",ppr:10495,frl:60,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,495/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "3602 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:false,media:true,stem:true,ela:false,sped:false,lms:"Google Classroom",useCase:"STEM Podcast \u00b7 Audio Science Projects",rationale:"Named math and science school. Soundtrap science lesson plans were written for this school.",notes:"Email science lesson plan PDF on first contact",contact:{champion:"Executive Director",approver:"Executive Director",phone:"719-520-2000",site:"d11.org",li:"Galileo School of Math & Science Executive Director"}},
  {id:130,district:"Colorado Springs D11",county:"El Paso",region:"Colorado Springs",name:"James Irwin Charter Schools",type:"Charter K-12",grades:"K-12",city:"Colorado Springs",status:"Prospect",score:"B",ppr:10495,frl:60,scorePts:5,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,495/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "4504 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM \u00b7 Engineering Podcast",rationale:"STEM/engineering charter. Students producing engineering podcasts + radio commercials.",notes:"",contact:{champion:"Executive Director",approver:"Executive Director",phone:"719-520-2000",site:"d11.org",li:"James Irwin Charter Schools Executive Director"}},
  {id:131,district:"Colorado Springs D11",county:"El Paso",region:"Colorado Springs",name:"Palmer High School",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10495,frl:60,scorePts:2,scoreReasons:["Per-pupil spending $10,495/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2704 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 IB Podcast \u00b7 STEM",rationale:"IB program + strong performing arts. IB Music alignment.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"719-520-2000",site:"d11.org",li:"Palmer High School Fine Arts Chair"}},
  {id:132,district:"Colorado Springs D11",county:"El Paso",region:"Colorado Springs",name:"Mitchell High School",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10495,frl:60,scorePts:2,scoreReasons:["Per-pupil spending $10,495/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-520-2000",site:"d11.org",li:"Mitchell High School Music Teacher"}},
  {id:133,district:"Colorado Springs D11",county:"El Paso",region:"Colorado Springs",name:"Doherty High School",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10495,frl:60,scorePts:2,scoreReasons:["Per-pupil spending $10,495/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"D11 HS with music program.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"719-520-2000",site:"d11.org",li:"Doherty High School Band Director"}},
  {id:134,district:"Colorado Springs D11",county:"El Paso",region:"Colorado Springs",name:"Sierra High School D11",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10495,frl:60,scorePts:2,scoreReasons:["Per-pupil spending $10,495/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"D11 HS. Music program present.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-520-2000",site:"d11.org",li:"Sierra High School D11 Music Teacher"}},
  {id:135,district:"Colorado Springs D11",county:"El Paso",region:"Colorado Springs",name:"Mann Middle School",type:"Middle School",grades:"6-8",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10495,frl:60,scorePts:2,scoreReasons:["Per-pupil spending $10,495/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 SpEd",rationale:"Music + SpEd use cases.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-520-2000",site:"d11.org",li:"Mann Middle School Music Teacher"}},
  {id:136,district:"Cheyenne Mountain D12",county:"El Paso",region:"Colorado Springs",name:"Cheyenne Mountain High School",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10092,frl:12,scorePts:3,scoreReasons:["Per-pupil spending $10,092/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 12% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Affluent CS district. Strong music program.",notes:"",contact:{champion:"Fine Arts Chair",approver:"Principal",phone:"719-475-6100",site:"cmsd12.org",li:"Cheyenne Mountain High School Fine Arts Chair"}},
  {id:137,district:"Cheyenne Mountain D12",county:"El Paso",region:"Colorado Springs",name:"Cheyenne Mountain Middle School",type:"Middle School",grades:"6-8",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10092,frl:12,scorePts:3,scoreReasons:["Per-pupil spending $10,092/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 12% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-475-6100",site:"cmsd12.org",li:"Cheyenne Mountain Middle School Music Teacher"}},
  {id:138,district:"Falcon D49",county:"El Paso",region:"Colorado Springs",name:"Vista Ridge High School",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10193,frl:25,scorePts:2,scoreReasons:["Per-pupil spending $10,193/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Growing D49 HS with active music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"719-495-1100",site:"d49.org",li:"Vista Ridge High School Band Director"}},
  {id:139,district:"Falcon D49",county:"El Paso",region:"Colorado Springs",name:"Sand Creek High School",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10193,frl:25,scorePts:2,scoreReasons:["Per-pupil spending $10,193/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-495-1100",site:"d49.org",li:"Sand Creek High School Music Teacher"}},
  {id:140,district:"Falcon D49",county:"El Paso",region:"Colorado Springs",name:"Falcon High School",type:"High School",grades:"9-12",city:"Falcon",status:"Prospect",score:"C",ppr:10193,frl:25,scorePts:2,scoreReasons:["Per-pupil spending $10,193/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Rural El Paso HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-495-1100",site:"d49.org",li:"Falcon High School Music Teacher"}},
  {id:141,district:"Falcon D49",county:"El Paso",region:"Colorado Springs",name:"Skyview Middle School",type:"Middle School",grades:"6-8",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10193,frl:25,scorePts:2,scoreReasons:["Per-pupil spending $10,193/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-495-1100",site:"d49.org",li:"Skyview Middle School Music Teacher"}},
  {id:142,district:"Harrison D2",county:"El Paso",region:"Colorado Springs",name:"Harrison High School",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10743,frl:75,scorePts:2,scoreReasons:["Per-pupil spending $10,743/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 75% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Diverse community. SpEd audio expression use case is strong.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-579-2000",site:"harrison.k12.co.us",li:"Harrison High School Music Teacher"}},
  {id:143,district:"Harrison D2",county:"El Paso",region:"Colorado Springs",name:"Mesa Ridge High School",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10743,frl:75,scorePts:2,scoreReasons:["Per-pupil spending $10,743/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 75% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 SpEd",rationale:"Diverse HS. SpEd use case.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-579-2000",site:"harrison.k12.co.us",li:"Mesa Ridge High School Music Teacher"}},
  {id:144,district:"Widefield D3",county:"El Paso",region:"Colorado Springs",name:"Widefield High School",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10202,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,202/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-391-3000",site:"wsd3.org",li:"Widefield High School Music Teacher"}},
  {id:145,district:"Widefield D3",county:"El Paso",region:"Colorado Springs",name:"Mesa Ridge Widefield",type:"High School",grades:"9-12",city:"Colorado Springs",status:"Prospect",score:"C",ppr:10202,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,202/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"HS with music program.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"719-391-3000",site:"wsd3.org",li:"Mesa Ridge Widefield Band Director"}},
  {id:146,district:"Greeley-Evans D6",county:"Weld",region:"Northern Colorado",name:"Greeley West High School",type:"High School",grades:"9-12",city:"Greeley",status:"Prospect",score:"C",ppr:10717,frl:65,scorePts:2,scoreReasons:["Per-pupil spending $10,717/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 65% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Podcast",rationale:"Large Weld County HS. Active music + journalism. Greeley is underserved market.",notes:"Pioneer account for Northern CO",contact:{champion:"Band Director",approver:"Principal",phone:"970-348-6000",site:"greeleyschools.org",li:"Greeley West High School Band Director"}},
  {id:147,district:"Greeley-Evans D6",county:"Weld",region:"Northern Colorado",name:"Greeley Central High School",type:"High School",grades:"9-12",city:"Greeley",status:"Prospect",score:"C",ppr:10717,frl:65,scorePts:2,scoreReasons:["Per-pupil spending $10,717/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 65% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-348-6000",site:"greeleyschools.org",li:"Greeley Central High School Music Teacher"}},
  {id:148,district:"Greeley-Evans D6",county:"Weld",region:"Northern Colorado",name:"Northridge High School",type:"High School",grades:"9-12",city:"Greeley",status:"Prospect",score:"C",ppr:10717,frl:65,scorePts:2,scoreReasons:["Per-pupil spending $10,717/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 65% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Diverse Greeley HS. SpEd use case.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-348-6000",site:"greeleyschools.org",li:"Northridge High School Music Teacher"}},
  {id:149,district:"Greeley-Evans D6",county:"Weld",region:"Northern Colorado",name:"Frontier Academy",type:"Charter K-12",grades:"K-12",city:"Greeley",status:"Prospect",score:"B",ppr:10717,frl:65,scorePts:5,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,717/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 65% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Charter K-12 in Greeley.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-348-6000",site:"greeleyschools.org",li:"Frontier Academy Music Teacher"}},
  {id:150,district:"Weld RE-4 Windsor",county:"Weld",region:"Northern Colorado",name:"Windsor High School",type:"High School",grades:"9-12",city:"Windsor",status:"Prospect",score:"C",ppr:10400,frl:18,scorePts:3,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2164 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM \u00b7 Podcast",rationale:"Fast-growing Windsor community. Modern, active music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-686-8000",site:"weldre4.org",li:"Windsor High School Band Director"}},
  {id:151,district:"Weld RE-4 Windsor",county:"Weld",region:"Northern Colorado",name:"Windsor Middle School",type:"Middle School",grades:"6-8",city:"Windsor",status:"Prospect",score:"C",ppr:10400,frl:18,scorePts:3,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-686-8000",site:"weldre4.org",li:"Windsor Middle School Music Teacher"}},
  {id:152,district:"Weld RE-1 (Gilcrest)",county:"Weld",region:"Northern Colorado",name:"Valley High School",type:"High School",grades:"9-12",city:"Gilcrest",status:"Prospect",score:"C",ppr:10400,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Rural Weld County HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-737-2410",site:"weld-re1.org",li:"Valley High School Music Teacher"}},
  {id:153,district:"Weld SD RE-5J (Johnstown)",county:"Weld",region:"Northern Colorado",name:"Roosevelt High School",type:"High School",grades:"9-12",city:"Johnstown",status:"Prospect",score:"C",ppr:10400,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Growing Johnstown area.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-587-6560",site:"weldre5j.org",li:"Roosevelt High School Music Teacher"}},
  {id:154,district:"Weld SD RE-8 (Fort Lupton)",county:"Weld",region:"Northern Colorado",name:"Fort Lupton High School",type:"High School",grades:"9-12",city:"Fort Lupton",status:"Prospect",score:"C",ppr:10400,frl:65,scorePts:1,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 65% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Rural HS. Music + SpEd use cases.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-857-7161",site:"weldre8.org",li:"Fort Lupton High School Music Teacher"}},
  {id:155,district:"Eaton RE-2",county:"Weld",region:"Northern Colorado",name:"Eaton High School",type:"High School",grades:"9-12",city:"Eaton",status:"Prospect",score:"C",ppr:10338,frl:22,scorePts:2,scoreReasons:["Per-pupil spending $10,338/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Rural Weld. Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-454-3402",site:"eatonschools.org",li:"Eaton High School Music Teacher"}},
  {id:156,district:"Platte Valley RE-7",county:"Weld",region:"Northern Colorado",name:"Platte Valley High School",type:"High School",grades:"9-12",city:"Kersey",status:"Prospect",score:"B",ppr:18677,frl:35,scorePts:4,scoreReasons:["Per-pupil spending $18,677/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Rural Weld County HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-785-2261",site:"pvre7.org",li:"Platte Valley High School Music Teacher"}},
  {id:157,district:"Pueblo City Schools D60",county:"Pueblo",region:"Pueblo",name:"STEM Academy of Pueblo",type:"Charter K-8",grades:"K-8",city:"Pueblo",status:"Prospect",score:"A",ppr:11000,frl:72,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $11,000/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2163 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 72% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:false,media:true,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"STEM Podcast \u00b7 ELA \u00b7 Special Ed",rationale:"STEM charter in Pueblo. Pioneer Southern CO account. COPPA compliance for K-8.",notes:"First Southern CO account opens whole market",contact:{champion:"Executive Director",approver:"Executive Director",phone:"719-549-7100",site:"pueblocityschools.us",li:"STEM Academy of Pueblo Executive Director"}},
  {id:158,district:"Pueblo City Schools D60",county:"Pueblo",region:"Pueblo",name:"Roncalli STEM Academy",type:"Charter HS",grades:"9-12",city:"Pueblo",status:"Prospect",score:"A",ppr:11000,frl:72,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $11,000/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 72% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:false,media:true,stem:true,ela:false,sped:false,lms:"Google Classroom",useCase:"STEM Podcast \u00b7 Career Audio",rationale:"STEM HS charter. First Pueblo Soundtrap HS account.",notes:"",contact:{champion:"Executive Director",approver:"Executive Director",phone:"719-549-7100",site:"pueblocityschools.us",li:"Roncalli STEM Academy Executive Director"}},
  {id:159,district:"Pueblo City Schools D60",county:"Pueblo",region:"Pueblo",name:"Centennial High School Pueblo",type:"High School",grades:"9-12",city:"Pueblo",status:"Prospect",score:"C",ppr:11000,frl:72,scorePts:2,scoreReasons:["Per-pupil spending $11,000/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 72% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-549-7100",site:"pueblocityschools.us",li:"Centennial High School Pueblo Music Teacher"}},
  {id:160,district:"Pueblo City Schools D60",county:"Pueblo",region:"Pueblo",name:"Central High School Pueblo",type:"High School",grades:"9-12",city:"Pueblo",status:"Prospect",score:"C",ppr:11000,frl:72,scorePts:2,scoreReasons:["Per-pupil spending $11,000/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2163 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 72% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"719-549-7100",site:"pueblocityschools.us",li:"Central High School Pueblo Band Director"}},
  {id:161,district:"Pueblo City Schools D60",county:"Pueblo",region:"Pueblo",name:"East High School Pueblo",type:"High School",grades:"9-12",city:"Pueblo",status:"Prospect",score:"C",ppr:11000,frl:72,scorePts:2,scoreReasons:["Per-pupil spending $11,000/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 72% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"Diverse Pueblo HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-549-7100",site:"pueblocityschools.us",li:"East High School Pueblo Music Teacher"}},
  {id:162,district:"Pueblo City Schools D60",county:"Pueblo",region:"Pueblo",name:"South High School Pueblo",type:"High School",grades:"9-12",city:"Pueblo",status:"Prospect",score:"C",ppr:11000,frl:72,scorePts:2,scoreReasons:["Per-pupil spending $11,000/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 72% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-549-7100",site:"pueblocityschools.us",li:"South High School Pueblo Music Teacher"}},
  {id:163,district:"Pueblo County SD70",county:"Pueblo",region:"Pueblo",name:"Pueblo County High School",type:"High School",grades:"9-12",city:"Pueblo",status:"Prospect",score:"C",ppr:11000,frl:62,scorePts:2,scoreReasons:["Per-pupil spending $11,000/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Rural Pueblo County HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-542-0220",site:"pueblosd70.org",li:"Pueblo County High School Music Teacher"}},
  {id:164,district:"Pueblo County SD70",county:"Pueblo",region:"Pueblo",name:"Rye High School",type:"High School",grades:"9-12",city:"Rye",status:"Prospect",score:"C",ppr:11000,frl:62,scorePts:2,scoreReasons:["Per-pupil spending $11,000/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 62% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Small rural HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-542-0220",site:"pueblosd70.org",li:"Rye High School Music Teacher"}},
  {id:165,district:"Mesa County Valley SD51",county:"Mesa",region:"Western Slope",name:"Tope STEM School",type:"Charter K-8",grades:"K-8",city:"Grand Junction",status:"Prospect",score:"A",ppr:10092,frl:44,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,092/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1803 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:false,media:true,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"STEM Podcast \u00b7 ELA \u00b7 SpEd",rationale:"STEM charter on Western Slope. Pioneer Grand Junction account.",notes:"First-mover advantage in GJ market",contact:{champion:"Principal",approver:"Principal",phone:"970-254-5100",site:"mesavalleyk12.org",li:"Tope STEM School Principal"}},
  {id:166,district:"Mesa County Valley SD51",county:"Mesa",region:"Western Slope",name:"Central High School GJ",type:"High School",grades:"9-12",city:"Grand Junction",status:"Prospect",score:"C",ppr:10092,frl:44,scorePts:2,scoreReasons:["Per-pupil spending $10,092/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2163 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-254-5100",site:"mesavalleyk12.org",li:"Central High School GJ Band Director"}},
  {id:167,district:"Mesa County Valley SD51",county:"Mesa",region:"Western Slope",name:"Grand Junction High School",type:"High School",grades:"9-12",city:"Grand Junction",status:"Prospect",score:"C",ppr:10092,frl:44,scorePts:2,scoreReasons:["Per-pupil spending $10,092/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-254-5100",site:"mesavalleyk12.org",li:"Grand Junction High School Music Teacher"}},
  {id:168,district:"Mesa County Valley SD51",county:"Mesa",region:"Western Slope",name:"Fruita Monument High School",type:"High School",grades:"9-12",city:"Fruita",status:"Prospect",score:"C",ppr:10092,frl:44,scorePts:2,scoreReasons:["Per-pupil spending $10,092/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Fruita HS. Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-254-5100",site:"mesavalleyk12.org",li:"Fruita Monument High School Music Teacher"}},
  {id:169,district:"Mesa County Valley SD51",county:"Mesa",region:"Western Slope",name:"Palisade High School",type:"High School",grades:"9-12",city:"Palisade",status:"Prospect",score:"C",ppr:10092,frl:44,scorePts:2,scoreReasons:["Per-pupil spending $10,092/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Agricultural area HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-254-5100",site:"mesavalleyk12.org",li:"Palisade High School Music Teacher"}},
  {id:170,district:"Mesa County Valley SD51",county:"Mesa",region:"Western Slope",name:"Mesa Valley Community School",type:"Charter K-12",grades:"K-12",city:"Grand Junction",status:"Prospect",score:"B",ppr:10092,frl:44,scorePts:5,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,092/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Charter K-12 in GJ.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-254-5100",site:"mesavalleyk12.org",li:"Mesa Valley Community School Music Teacher"}},
  {id:171,district:"Mesa County Valley SD51",county:"Mesa",region:"Western Slope",name:"Bookcliff Middle School",type:"Middle School",grades:"6-8",city:"Grand Junction",status:"Prospect",score:"C",ppr:10092,frl:44,scorePts:2,scoreReasons:["Per-pupil spending $10,092/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-254-5100",site:"mesavalleyk12.org",li:"Bookcliff Middle School Music Teacher"}},
  {id:172,district:"Montrose County SD",county:"Montrose",region:"Western Slope",name:"Montrose High School",type:"High School",grades:"9-12",city:"Montrose",status:"Prospect",score:"C",ppr:10400,frl:45,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Western Slope HS with active music.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-249-7726",site:"mcsd.org",li:"Montrose High School Band Director"}},
  {id:173,district:"Montrose County SD",county:"Montrose",region:"Western Slope",name:"Olathe High School",type:"High School",grades:"9-12",city:"Olathe",status:"Prospect",score:"C",ppr:10400,frl:45,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Small rural HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-249-7726",site:"mcsd.org",li:"Olathe High School Music Teacher"}},
  {id:174,district:"Montrose County SD",county:"Montrose",region:"Western Slope",name:"Montrose Middle School",type:"Middle School",grades:"6-8",city:"Montrose",status:"Prospect",score:"C",ppr:10400,frl:45,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-249-7726",site:"mcsd.org",li:"Montrose Middle School Music Teacher"}},
  {id:175,district:"Delta County SD",county:"Delta",region:"Western Slope",name:"Delta High School",type:"High School",grades:"9-12",city:"Delta",status:"Prospect",score:"C",ppr:10396,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,396/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Western Slope HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-874-4438",site:"deltaschools.com",li:"Delta High School Music Teacher"}},
  {id:176,district:"Garfield RE-2 (Rifle)",county:"Garfield",region:"Western Slope",name:"Rifle High School",type:"High School",grades:"9-12",city:"Rifle",status:"Prospect",score:"C",ppr:10242,frl:50,scorePts:2,scoreReasons:["Per-pupil spending $10,242/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Western Slope HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-625-7600",site:"garfieldre2.org",li:"Rifle High School Music Teacher"}},
  {id:177,district:"Roaring Fork SD",county:"Garfield/Pitkin",region:"Mountain/Resort",name:"Glenwood Springs High School",type:"High School",grades:"9-12",city:"Glenwood Springs",status:"Prospect",score:"C",ppr:11200,frl:32,scorePts:3,scoreReasons:["Per-pupil spending $11,200/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2163 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Glenwood Springs HS. Active music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-384-6000",site:"rfsd.k12.co.us",li:"Glenwood Springs High School Band Director"}},
  {id:178,district:"Roaring Fork SD",county:"Garfield/Pitkin",region:"Mountain/Resort",name:"Basalt High School",type:"High School",grades:"9-12",city:"Basalt",status:"Prospect",score:"C",ppr:11200,frl:32,scorePts:3,scoreReasons:["Per-pupil spending $11,200/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program near Aspen.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-384-6000",site:"rfsd.k12.co.us",li:"Basalt High School Music Teacher"}},
  {id:179,district:"Roaring Fork SD",county:"Garfield/Pitkin",region:"Mountain/Resort",name:"Carbondale Middle School",type:"Middle School",grades:"6-8",city:"Carbondale",status:"Prospect",score:"C",ppr:11200,frl:32,scorePts:3,scoreReasons:["Per-pupil spending $11,200/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-384-6000",site:"rfsd.k12.co.us",li:"Carbondale Middle School Music Teacher"}},
  {id:180,district:"Aspen SD1",county:"Pitkin",region:"Mountain/Resort",name:"Aspen High School",type:"High School",grades:"9-12",city:"Aspen",status:"Prospect",score:"B",ppr:13878,frl:15,scorePts:5,scoreReasons:["Per-pupil spending $13,878/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "1804 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 15% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Podcast \u00b7 STEAM",rationale:"Extremely affluent. Zero budget objection. Strong arts. Spotify brand opens doors immediately.",notes:"Premium pitch for premium school",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-925-3760",site:"aspenk12.net",li:"Aspen High School Music Teacher"}},
  {id:181,district:"Aspen SD1",county:"Pitkin",region:"Mountain/Resort",name:"Aspen Middle School",type:"Middle School",grades:"6-8",city:"Aspen",status:"Prospect",score:"B",ppr:13878,frl:15,scorePts:5,scoreReasons:["Per-pupil spending $13,878/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 15% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-925-3760",site:"aspenk12.net",li:"Aspen Middle School Music Teacher"}},
  {id:182,district:"Summit SD RE-1",county:"Summit",region:"Mountain/Resort",name:"Summit High School",type:"High School",grades:"9-12",city:"Breckenridge",status:"Prospect",score:"B",ppr:13000,frl:20,scorePts:4,scoreReasons:["Per-pupil spending $13,000/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Summit County = resort community. Strong academics.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-368-1000",site:"summitk12.org",li:"Summit High School Band Director"}},
  {id:183,district:"Summit SD RE-1",county:"Summit",region:"Mountain/Resort",name:"Summit Middle School",type:"Middle School",grades:"6-8",city:"Frisco",status:"Prospect",score:"B",ppr:13000,frl:20,scorePts:4,scoreReasons:["Per-pupil spending $13,000/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-368-1000",site:"summitk12.org",li:"Summit Middle School Music Teacher"}},
  {id:184,district:"Eagle County Schools",county:"Eagle",region:"Mountain/Resort",name:"Battle Mountain High School",type:"High School",grades:"9-12",city:"Edwards",status:"Prospect",score:"C",ppr:11135,frl:22,scorePts:3,scoreReasons:["Per-pupil spending $11,135/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1803 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Podcast",rationale:"Vail/Eagle County. Affluent community. Active arts + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-328-6321",site:"eagleschools.net",li:"Battle Mountain High School Band Director"}},
  {id:185,district:"Eagle County Schools",county:"Eagle",region:"Mountain/Resort",name:"Eagle Valley High School",type:"High School",grades:"9-12",city:"Gypsum",status:"Prospect",score:"C",ppr:11135,frl:22,scorePts:3,scoreReasons:["Per-pupil spending $11,135/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Eagle County HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-328-6321",site:"eagleschools.net",li:"Eagle Valley High School Music Teacher"}},
  {id:186,district:"Eagle County Schools",county:"Eagle",region:"Mountain/Resort",name:"Berry Creek Middle School",type:"Middle School",grades:"6-8",city:"Edwards",status:"Prospect",score:"C",ppr:11135,frl:22,scorePts:3,scoreReasons:["Per-pupil spending $11,135/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-328-6321",site:"eagleschools.net",li:"Berry Creek Middle School Music Teacher"}},
  {id:187,district:"Telluride SD R-1",county:"San Miguel",region:"Mountain/Resort",name:"Telluride High School",type:"High School",grades:"9-12",city:"Telluride",status:"Prospect",score:"B",ppr:18000,frl:10,scorePts:5,scoreReasons:["Per-pupil spending $18,000/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "1443 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 10% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Podcast",rationale:"Extremely affluent resort community. Tiny school, zero budget objection.",notes:"Zero budget objection",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-728-6617",site:"tellurideschools.org",li:"Telluride High School Music Teacher"}},
  {id:188,district:"Steamboat Springs RE-2",county:"Routt",region:"Mountain/Resort",name:"Steamboat Springs High School",type:"High School",grades:"9-12",city:"Steamboat Springs",status:"Prospect",score:"B",ppr:12000,frl:18,scorePts:4,scoreReasons:["Per-pupil spending $12,000/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1803 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 18% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Resort community. Active music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-871-3040",site:"sssd.org",li:"Steamboat Springs High School Band Director"}},
  {id:189,district:"Durango SD 9-R",county:"La Plata",region:"Southern Colorado",name:"Durango High School",type:"High School",grades:"9-12",city:"Durango",status:"Prospect",score:"C",ppr:10465,frl:28,scorePts:2,scoreReasons:["Per-pupil spending $10,465/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2163 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media Podcast",rationale:"Southwest CO HS. Active music + journalism. Affluent community.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-247-5411",site:"durangoschools.org",li:"Durango High School Band Director"}},
  {id:190,district:"Durango SD 9-R",county:"La Plata",region:"Southern Colorado",name:"Escalante Middle School",type:"Middle School",grades:"6-8",city:"Durango",status:"Prospect",score:"C",ppr:10465,frl:28,scorePts:2,scoreReasons:["Per-pupil spending $10,465/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-247-5411",site:"durangoschools.org",li:"Escalante Middle School Music Teacher"}},
  {id:191,district:"Archuleta SD 50-JT",county:"Archuleta",region:"Southern Colorado",name:"Pagosa Springs High School",type:"High School",grades:"9-12",city:"Pagosa Springs",status:"Prospect",score:"C",ppr:10856,frl:42,scorePts:3,scoreReasons:["Per-pupil spending $10,856/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"SW Colorado rural HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-264-2228",site:"pagosa.k12.co.us",li:"Pagosa Springs High School Music Teacher"}},
  {id:192,district:"La Plata SD 9-R (Bayfield)",county:"La Plata",region:"Southern Colorado",name:"Bayfield High School",type:"High School",grades:"9-12",city:"Bayfield",status:"Prospect",score:"C",ppr:11097,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $11,097/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Rural La Plata County HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-884-2496",site:"bayfield.k12.co.us",li:"Bayfield High School Music Teacher"}},
  {id:193,district:"Alamosa RE-11J",county:"Alamosa",region:"Southern Colorado",name:"Alamosa High School",type:"High School",grades:"9-12",city:"Alamosa",status:"Prospect",score:"C",ppr:10485,frl:68,scorePts:1,scoreReasons:["Per-pupil spending $10,485/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 68% (NCES) \u2014 budget-constrained district; lead with free trial + SpEd/equity use case"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 SpEd",rationale:"San Luis Valley HS. Music + SpEd.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-587-1600",site:"alamosa.k12.co.us",li:"Alamosa High School Music Teacher"}},
  {id:194,district:"Canon City RE-1",county:"Fremont",region:"Southern Colorado",name:"Canon City High School",type:"High School",grades:"9-12",city:"Canon City",status:"Prospect",score:"C",ppr:10139,frl:42,scorePts:2,scoreReasons:["Per-pupil spending $10,139/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1803 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Active music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"719-276-5700",site:"canoncityschools.org",li:"Canon City High School Band Director"}},
  {id:195,district:"Canon City RE-1",county:"Fremont",region:"Southern Colorado",name:"Canon City Middle School",type:"Middle School",grades:"6-8",city:"Canon City",status:"Prospect",score:"C",ppr:10139,frl:42,scorePts:2,scoreReasons:["Per-pupil spending $10,139/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-276-5700",site:"canoncityschools.org",li:"Canon City Middle School Music Teacher"}},
  {id:196,district:"Fremont RE-2 (Florence)",county:"Fremont",region:"Southern Colorado",name:"Florence High School",type:"High School",grades:"9-12",city:"Florence",status:"Prospect",score:"C",ppr:10538,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,538/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Rural Fremont HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-784-6312",site:"florenceschools.org",li:"Florence High School Music Teacher"}},
  {id:197,district:"Gunnison Watershed RE-1J",county:"Gunnison",region:"Mountain/Resort",name:"Gunnison High School",type:"High School",grades:"9-12",city:"Gunnison",status:"Prospect",score:"C",ppr:10561,frl:30,scorePts:2,scoreReasons:["Per-pupil spending $10,561/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Western CO rural HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-641-7760",site:"gunnison.k12.co.us",li:"Gunnison High School Music Teacher"}},
  {id:198,district:"Limon RE-4J",county:"Lincoln",region:"Eastern Plains",name:"Limon High School",type:"High School",grades:"9-12",city:"Limon",status:"Prospect",score:"C",ppr:10614,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Eastern plains HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-775-2342",site:"limon.k12.co.us",li:"Limon High School Music Teacher"}},
  {id:199,district:"Burlington RE-6J",county:"Kit Carson",region:"Eastern Plains",name:"Burlington High School",type:"High School",grades:"9-12",city:"Burlington",status:"Prospect",score:"C",ppr:10614,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Eastern plains HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-346-8521",site:"burlington.k12.co.us",li:"Burlington High School Music Teacher"}},
  {id:200,district:"Lamar RE-2",county:"Prowers",region:"Eastern Plains",name:"Lamar High School",type:"High School",grades:"9-12",city:"Lamar",status:"Prospect",score:"C",ppr:10894,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,894/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Southeast plains HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-336-3251",site:"lamarschools.org",li:"Lamar High School Music Teacher"}},
  {id:201,district:"Las Animas RE-1",county:"Bent",region:"Eastern Plains",name:"Las Animas High School",type:"High School",grades:"9-12",city:"Las Animas",status:"Prospect",score:"C",ppr:10892,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,892/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Southeast CO rural HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-456-1111",site:"lasanimasschools.org",li:"Las Animas High School Music Teacher"}},
  {id:202,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"Lotus School for Excellence",type:"Charter K-12",grades:"K-12",city:"Aurora",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:7,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "5404 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 STEM \u00b7 ELA \u00b7 Podcast \u2014 All Depts",rationale:"STEM + sciences K-12 adjacent to Cherry Creek. Music/Science/ELA/SpEd all have dedicated lesson plans. CSI = direct purchase. Highest priority on list.",notes:"Call today. Multi-dept pitch day one",contact:{champion:"Executive Director",approver:"Executive Director",phone:"303-773-5483",site:"csi.state.co.us",li:"Lotus School for Excellence Executive Director"}},
  {id:203,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"Galileo School of Math & Science",type:"Charter K-12",grades:"K-12",city:"Colorado Springs",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:7,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "3602 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:false,media:true,stem:true,ela:false,sped:false,lms:"Google Classroom",useCase:"STEM Podcast \u00b7 Audio Science Projects",rationale:"Named math + science school. Soundtrap science lesson plans were written for this school.",notes:"Email science lesson plan PDF",contact:{champion:"Executive Director",approver:"Executive Director",phone:"303-773-5483",site:"csi.state.co.us",li:"Galileo School of Math & Science Executive Director"}},
  {id:204,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"James Irwin Charter Schools",type:"Charter K-12",grades:"K-12",city:"Colorado Springs",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "4504 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 STEM \u00b7 Engineering Podcast",rationale:"STEM/engineering charter. Charter = direct purchase.",notes:"",contact:{champion:"Executive Director",approver:"Executive Director",phone:"303-773-5483",site:"csi.state.co.us",li:"James Irwin Charter Schools Executive Director"}},
  {id:205,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"Thinker K-8 STEM Charter",type:"Charter K-8",grades:"K-8",city:"Westminster",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:7,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 STEM \u00b7 ELA",rationale:"STEM K-8. COPPA compliance is the pitch.",notes:"COPPA = key differentiator for K-8",contact:{champion:"Principal",approver:"Principal",phone:"303-773-5483",site:"csi.state.co.us",li:"Thinker K-8 STEM Charter Principal"}},
  {id:206,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"STEM Magnet Lab Aurora",type:"Charter K-8",grades:"K-8",city:"Aurora",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:7,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:false,media:true,stem:true,ela:true,sped:true,lms:"Google Classroom",useCase:"STEM Podcast \u00b7 ELA",rationale:"Aurora STEM charter. Group with Lotus pitch.",notes:"",contact:{champion:"Executive Director",approver:"Executive Director",phone:"303-773-5483",site:"csi.state.co.us",li:"STEM Magnet Lab Aurora Executive Director"}},
  {id:207,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"Colorado Early Colleges Aurora",type:"Charter HS",grades:"9-12",city:"Aurora",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:false,media:true,stem:true,ela:false,sped:false,lms:"Google Classroom",useCase:"Dual Enrollment Podcast \u00b7 STEM",rationale:"Dual enrollment. Audio = real-world workforce skill.",notes:"",contact:{champion:"Activities Dir",approver:"Principal",phone:"303-773-5483",site:"csi.state.co.us",li:"Colorado Early Colleges Aurora Activities Dir"}},
  {id:208,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"Rocky Mountain Classical Academy",type:"Charter K-12",grades:"K-12",city:"Colorado Springs",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Classical curriculum. Music + literacy use cases.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-773-5483",site:"csi.state.co.us",li:"Rocky Mountain Classical Academy Music Teacher"}},
  {id:209,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"Pikes Peak Classical Academy",type:"Charter K-12",grades:"K-12",city:"Colorado Springs",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Classical K-12.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-773-5483",site:"csi.state.co.us",li:"Pikes Peak Classical Academy Music Teacher"}},
  {id:210,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"School of Science & Technology Pueblo",type:"Charter K-12",grades:"K-12",city:"Pueblo",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:7,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Named STEM/Arts/specialty charter \u2014 curriculum fit + direct purchase authority", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:false,media:true,stem:true,ela:false,sped:false,lms:"Google Classroom",useCase:"STEM Podcast \u00b7 Career Audio",rationale:"Pioneer Pueblo STEM account.",notes:"",contact:{champion:"Executive Director",approver:"Executive Director",phone:"303-773-5483",site:"csi.state.co.us",li:"School of Science & Technology Pueblo Executive Director"}},
  {id:211,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"KIPP Colorado Schools",type:"Charter K-12",grades:"K-12",city:"Denver",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "3602 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 Student Voice",rationale:"KIPP mission = student voice. National network.",notes:"",contact:{champion:"Executive Director",approver:"Executive Director",phone:"303-773-5483",site:"csi.state.co.us",li:"KIPP Colorado Schools Executive Director"}},
  {id:212,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"Global Village Academy Northglenn",type:"Charter K-8",grades:"K-8",city:"Northglenn",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:false,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"World Language Podcast",rationale:"Immersion languages. 15-language transcript.",notes:"",contact:{champion:"WL Dept Chair",approver:"Principal",phone:"303-773-5483",site:"csi.state.co.us",li:"Global Village Academy Northglenn WL Dept Chair"}},
  {id:213,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"Strive Prep Federal",type:"Charter HS",grades:"6-12",city:"Denver",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:true,lms:"Google Classroom",useCase:"Music \u00b7 ELA \u00b7 Student Voice",rationale:"Serves underserved students. Audio expression = strong use case.",notes:"",contact:{champion:"ELA Teacher",approver:"Executive Director",phone:"303-773-5483",site:"csi.state.co.us",li:"Strive Prep Federal ELA Teacher"}},
  {id:214,district:"CO Charter School Institute",county:"Statewide",region:"Statewide Charter",name:"Highline Academy Charter School",type:"Charter K-8",grades:"K-8",city:"Aurora",status:"Prospect",score:"A",ppr:10614,frl:35,scorePts:6,scoreReasons:["Charter school \u2014 buys directly, no district procurement committee needed", "Per-pupil spending $10,614/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Charter K-8 in Aurora.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-773-5483",site:"csi.state.co.us",li:"Highline Academy Charter School Music Teacher"}},
  {id:215,district:"Fountain-Fort Carson D8",county:"El Paso",region:"Colorado Springs",name:"Fountain-Fort Carson High School",type:"High School",grades:"9-12",city:"Fountain",status:"Prospect",score:"C",ppr:10202,frl:45,scorePts:2,scoreReasons:["Per-pupil spending $10,202/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2162 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Military community adjacent HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-382-1300",site:"ffc8.org",li:"Fountain-Fort Carson High School Music Teacher"}},
  {id:216,district:"Fountain-Fort Carson D8",county:"El Paso",region:"Colorado Springs",name:"Fountain Middle School",type:"Middle School",grades:"6-8",city:"Fountain",status:"Prospect",score:"C",ppr:10202,frl:45,scorePts:2,scoreReasons:["Per-pupil spending $10,202/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-382-1300",site:"ffc8.org",li:"Fountain Middle School Music Teacher"}},
  {id:217,district:"Woodland Park RE-2",county:"Teller",region:"Colorado Springs",name:"Woodland Park High School",type:"High School",grades:"9-12",city:"Woodland Park",status:"Prospect",score:"C",ppr:10400,frl:20,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Mountain community HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-686-2000",site:"wpr2.org",li:"Woodland Park High School Music Teacher"}},
  {id:218,district:"Cripple Creek-Victor RE-1",county:"Teller",region:"Colorado Springs",name:"Cripple Creek-Victor High School",type:"High School",grades:"9-12",city:"Cripple Creek",status:"Prospect",score:"B",ppr:14259,frl:35,scorePts:4,scoreReasons:["Per-pupil spending $14,259/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Small rural HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-689-2685",site:"ccv.k12.co.us",li:"Cripple Creek-Victor High School Music Teacher"}},
  {id:219,district:"Lewis-Palmer D38",county:"El Paso",region:"Colorado Springs",name:"Palmer Ridge High School",type:"High School",grades:"9-12",city:"Monument",status:"Prospect",score:"C",ppr:10092,frl:8,scorePts:3,scoreReasons:["Per-pupil spending $10,092/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2704 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 8% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:true,stem:true,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media \u00b7 STEM",rationale:"Monument/D38 HS. Growing community. Strong academics.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"719-488-4700",site:"lewispalmer.org",li:"Palmer Ridge High School Band Director"}},
  {id:220,district:"Lewis-Palmer D38",county:"El Paso",region:"Colorado Springs",name:"Lewis-Palmer High School",type:"High School",grades:"9-12",city:"Monument",status:"Prospect",score:"C",ppr:10092,frl:8,scorePts:3,scoreReasons:["Per-pupil spending $10,092/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2702 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 8% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music program.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-488-4700",site:"lewispalmer.org",li:"Lewis-Palmer High School Music Teacher"}},
  {id:221,district:"Lewis-Palmer D38",county:"El Paso",region:"Colorado Springs",name:"Lewis-Palmer Middle School",type:"Middle School",grades:"6-8",city:"Monument",status:"Prospect",score:"C",ppr:10092,frl:8,scorePts:3,scoreReasons:["Per-pupil spending $10,092/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription", "District FRL 8% (NCES) \u2014 affluent community, easy budget conversation"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Active music.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-488-4700",site:"lewispalmer.org",li:"Lewis-Palmer Middle School Music Teacher"}},
  {id:222,district:"Elizabeth C-1",county:"Elbert",region:"Metro Denver",name:"Elizabeth High School",type:"High School",grades:"9-12",city:"Elizabeth",status:"Prospect",score:"C",ppr:10486,frl:22,scorePts:2,scoreReasons:["Per-pupil spending $10,486/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Rural Elbert County HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-646-1551",site:"elizabeth.k12.co.us",li:"Elizabeth High School Music Teacher"}},
  {id:223,district:"Elbert County SD C-2",county:"Elbert",region:"Metro Denver",name:"Elbert High School",type:"High School",grades:"9-12",city:"Elbert",status:"Prospect",score:"B",ppr:15736,frl:35,scorePts:4,scoreReasons:["Per-pupil spending $15,736/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Very small rural HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-646-4911",site:"elbert.k12.co.us",li:"Elbert High School Music Teacher"}},
  {id:224,district:"Strasburg D31J",county:"Adams",region:"Metro Denver",name:"Strasburg High School",type:"High School",grades:"9-12",city:"Strasburg",status:"Prospect",score:"C",ppr:10400,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Rural eastern Denver metro HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-622-4202",site:"strasburg.k12.co.us",li:"Strasburg High School Music Teacher"}},
  {id:225,district:"Byers 32J",county:"Arapahoe",region:"Metro Denver",name:"Byers High School",type:"High School",grades:"9-12",city:"Byers",status:"Prospect",score:"C",ppr:10306,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,306/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Rural Arapahoe HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-822-5228",site:"byers.k12.co.us",li:"Byers High School Music Teacher"}},
  {id:226,district:"Arapahoe RE-1 (Limon area)",county:"Arapahoe",region:"Eastern Plains",name:"Arapahoe High School (Arapahoe)",type:"High School",grades:"9-12",city:"Arapahoe",status:"Prospect",score:"C",ppr:11774,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $11,774/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "902 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Very small rural HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-775-2342",site:"arapahoe.k12.co.us",li:"Arapahoe High School (Arapahoe) Music Teacher"}},
  {id:227,district:"Kit Carson R-1",county:"Cheyenne",region:"Eastern Plains",name:"Kit Carson High School",type:"High School",grades:"9-12",city:"Kit Carson",status:"Prospect",score:"B",ppr:19911,frl:35,scorePts:4,scoreReasons:["Per-pupil spending $19,911/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "722 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Very small rural HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-962-3371",site:"kitcarson.k12.co.us",li:"Kit Carson High School Music Teacher"}},
  {id:228,district:"Haxtun RE-2J",county:"Phillips",region:"Eastern Plains",name:"Haxtun High School",type:"High School",grades:"9-12",city:"Haxtun",status:"Prospect",score:"B",ppr:13171,frl:35,scorePts:4,scoreReasons:["Per-pupil spending $13,171/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "902 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Small northeast plains HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-774-6111",site:"haxtun.k12.co.us",li:"Haxtun High School Music Teacher"}},
  {id:229,district:"Julesburg RE-1",county:"Sedgwick",region:"Eastern Plains",name:"Julesburg High School",type:"High School",grades:"9-12",city:"Julesburg",status:"Prospect",score:"C",ppr:10398,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,398/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Northeast CO rural HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-474-3353",site:"julessburg.k12.co.us",li:"Julesburg High School Music Teacher"}},
  {id:230,district:"Sterling RE-1",county:"Logan",region:"Eastern Plains",name:"Sterling High School",type:"High School",grades:"9-12",city:"Sterling",status:"Prospect",score:"C",ppr:10700,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,700/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Northeast CO HS.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-522-0792",site:"sterlingschools.org",li:"Sterling High School Band Director"}},
  {id:231,district:"Fort Morgan RE-3",county:"Morgan",region:"Eastern Plains",name:"Fort Morgan High School",type:"High School",grades:"9-12",city:"Fort Morgan",status:"Prospect",score:"C",ppr:10719,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $10,719/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1802 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Northeast CO HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-867-5633",site:"fmre3.org",li:"Fort Morgan High School Music Teacher"}},
  {id:232,district:"Brush RE-2J",county:"Morgan",region:"Eastern Plains",name:"Brush High School",type:"High School",grades:"9-12",city:"Brush",status:"Prospect",score:"C",ppr:11189,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $11,189/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Small northeastern CO HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-842-5271",site:"brush.k12.co.us",li:"Brush High School Music Teacher"}},
  {id:233,district:"Wray RD-2",county:"Yuma",region:"Eastern Plains",name:"Wray High School",type:"High School",grades:"9-12",city:"Wray",status:"Prospect",score:"B",ppr:16480,frl:35,scorePts:4,scoreReasons:["Per-pupil spending $16,480/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Small rural HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-332-4851",site:"wray.k12.co.us",li:"Wray High School Music Teacher"}},
  {id:234,district:"Akron R-1",county:"Washington",region:"Eastern Plains",name:"Akron High School",type:"High School",grades:"9-12",city:"Akron",status:"Prospect",score:"C",ppr:12632,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $12,632/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "902 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Very small rural HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-345-2234",site:"akron.k12.co.us",li:"Akron High School Music Teacher"}},
  {id:235,district:"Loveland RE-4C",county:"Larimer",region:"Fort Collins / Larimer",name:"Mountain View High School (Loveland)",type:"High School",grades:"9-12",city:"Loveland",status:"Prospect",score:"C",ppr:10400,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "2703 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:true,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 Media",rationale:"Part of Thompson SD. Active music + journalism.",notes:"",contact:{champion:"Band Director",approver:"Principal",phone:"970-635-5100",site:"thompsonschools.org",li:"Mountain View High School (Loveland) Band Director"}},
  {id:236,district:"Estes Park R-3",county:"Larimer",region:"Mountain/Resort",name:"Estes Park High School",type:"High School",grades:"9-12",city:"Estes Park",status:"Prospect",score:"C",ppr:11559,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $11,559/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Mountain resort community HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-586-3318",site:"estespark.k12.co.us",li:"Estes Park High School Music Teacher"}},
  {id:237,district:"Poudre Valley RE-1 (Wellington)",county:"Larimer",region:"Fort Collins / Larimer",name:"Centennial Elementary Wellington",type:"Elementary",grades:"K-5",city:"Wellington",status:"Prospect",score:"C",ppr:10400,frl:35,scorePts:2,scoreReasons:["Per-pupil spending $10,400/yr (CDE 2023-24) \u2014 below state avg $10,614, expect tighter budget scrutiny", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Growing Wellington community.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"970-568-3300",site:"wellingtonre1.com",li:"Centennial Elementary Wellington Music Teacher"}},
  {id:238,district:"Park R-3 (Estes Park)",county:"Park",region:"Mountain/Resort",name:"South Park High School",type:"High School",grades:"9-12",city:"Fairplay",status:"Prospect",score:"B",ppr:18046,frl:35,scorePts:4,scoreReasons:["Per-pupil spending $18,046/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Small Park County HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"719-836-2200",site:"plattecanyonsd.org",li:"South Park High School Music Teacher"}},
  {id:239,district:"Platte Canyon SD",county:"Park",region:"Mountain/Resort",name:"Platte Canyon High School",type:"High School",grades:"9-12",city:"Bailey",status:"Prospect",score:"C",ppr:11500,frl:35,scorePts:3,scoreReasons:["Per-pupil spending $11,500/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Mountain area HS.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-838-7666",site:"plattecanyonsd.org",li:"Platte Canyon High School Music Teacher"}},
  {id:240,district:"Clear Creek RE-1",county:"Clear Creek",region:"Mountain/Resort",name:"Clear Creek High School",type:"High School",grades:"9-12",city:"Idaho Springs",status:"Prospect",score:"C",ppr:11710,frl:20,scorePts:3,scoreReasons:["Per-pupil spending $11,710/yr (CDE 2023-24) \u2014 at/above state avg $10,614", "1442 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Mountain area HS near Denver.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-679-2272",site:"clearcreekschools.org",li:"Clear Creek High School Music Teacher"}},
  {id:241,district:"Gilpin County RE-1",county:"Gilpin",region:"Mountain/Resort",name:"Gilpin County School",type:"K-12",grades:"K-12",city:"Black Hawk",status:"Prospect",score:"B",ppr:13214,frl:25,scorePts:4,scoreReasons:["Per-pupil spending $13,214/yr (CDE 2023-24, vs. state avg $10,614) \u2014 affluent community, minimal budget friction", "1082 confirmed program use cases \u2014 multi-dept adoption likely from one subscription"],music:true,media:false,stem:false,ela:true,sped:false,lms:"Google Classroom",useCase:"Music \u00b7 ELA",rationale:"Very small mountain K-12.",notes:"",contact:{champion:"Music Teacher",approver:"Principal",phone:"303-582-3444",site:"gilpinschools.org",li:"Gilpin County School Music Teacher"}}
];


const REGIONS = [...new Set(SCHOOLS.map(s => s.region))].sort();
const DISTRICT_LIST = [...new Set(SCHOOLS.map(s => s.district))].sort();
const SCORE_LABELS = { A: "🔥 HOT", B: "✅ Warm", C: "🔷 Moderate" };

// ─── AI SYSTEM PROMPT ─────────────────────────────────────────────────────
const SYS = `You are PITCH, a senior Soundtrap for Education sales intelligence agent. Confident, specific, data-driven. Top-1% B2B education technology sales advisor.

SOUNDTRAP FOR EDUCATION (soundtrap.com/edu): Browser-based cloud DAW and podcast studio for K-12, owned by Spotify since 2017. Any device, no download. COPPA/FERPA/GDPR/CIPA certified. Walled garden.

PLANS: Classroom (single music class, min 50 seats), School (multi-subject, podcast tools, LMS rostering), District (all schools, premium support). ~$15-30/seat/year. 30-day free trial always available.

KEY FEATURES: 24,000+ royalty-free loops and 400+ instrument presets updated every 2 weeks. Interactive transcript — edit audio by editing text, 15+ languages. Real-time collaboration. Teacher dashboard with assignments, grading. LMS integrations: Google Classroom, Canvas, Schoology, Teams, MusicFirst, Noteflight, Flat.io.

FREE LESSON PLANS: Science (periodic table song, Fibonacci in music, scientific method podcast). Math (fractions = note values). ELA (reading fluency, narrative poems, audio interviews, Readers Theatre). World Language (target-language podcasts). Tech/Business (radio commercial production). SpEd (audio expression, mindfulness, fluency).

RESEARCH (2025 District Evidence Report, 35 teachers, 6,416 students, 33 districts): 97% reported positive learning outcomes. 88% observed students presenting more compellingly.

SIGNED ANCHOR CLIENT: Cherry Creek School District, Colorado. Multiple campuses for Music, STEM, ELA, SpEd. Reference in every conversation.

COMPETITORS: GarageBand — Apple-only, no Chromebooks, no real-time collab, no LMS. Budget — roughly $20/seat/yr, 100 students = less than one sub teacher day per semester. BandLab — lacks LMS integration, lesson plan library, COPPA walled garden.

Rules: No asterisks. No markdown. Plain dashes for lists. Direct and specific always.`;

// ─── EMAIL PROMPT BUILDER ─────────────────────────────────────────────────
function buildEmailPrompt(school, role, tone, quals) {
  const roleCtx = {
    music_teacher: "Write to a Music Teacher or Band/Choir Director. Focus on music composition, recording, student creative projects, replacing expensive DAW software.",
    stem_teacher: "Write to a Science/STEM teacher. Lead with cross-curricular lesson plans — periodic table song, scientific method podcast, Fibonacci music.",
    ela_teacher: "Write to an ELA/English teacher. Lead with reading fluency recording, narrative poem recording, audio storytelling.",
    world_language: "Write to a World Language teacher. Lead with the 15+ language transcript feature and target-language podcast creation.",
    sped: "Write to a Special Education teacher or SLP. Lead with: 'Soundtrap allows my students to express themselves emotionally, socially and academically when it is often so hard for them to do so verbally.'",
    principal: "Write to a Principal. Lead with 97% positive outcomes, LMS integration, COPPA/FERPA compliance, multi-department value.",
    exec_director: "Write to a Charter School Executive Director. Lead with direct purchase authority, multi-department adoption, Cherry Creek as peer social proof.",
    fine_arts_dir: "Write to a Fine Arts Director. Lead with cross-subject expansion, 30-day trial, Cherry Creek social proof.",
    curriculum_dir: "Write to a Curriculum/IT Director. Lead with LMS integration, COPPA/FERPA/CIPA compliance, district plan option.",
    activities_dir: "Write to an Activities Director or Journalism teacher. Lead with podcast tools, interactive transcript, student broadcast production.",
  };
  const toneCtx = {
    cold: "Cold outreach. First touch. ONE hook. One proof point. Ask for a 15-min call. Under 120 words.",
    followup: "Follow-up to cold email with no reply. Shorter. New angle. Lower-friction ask.",
    demo_recap: "Post-demo recap. Thank them. Reinforce 2-3 key points. Clear next step.",
    trial: "Trial activation. They agreed to 30-day trial. Clear first step. 1-2 quick wins for admin.",
  };
  return `Generate a professional sales email for Soundtrap for Education.

${roleCtx[role] || "Write to this education contact."}

SCHOOL: ${school.name}, ${school.district}, ${school.city}
TYPE: ${school.type}, Grades ${school.grades}
USE CASE: ${school.useCase}
${quals.length ? "Qualifiers: " + quals.join(", ") : ""}

EMAIL TYPE: ${tone}. ${toneCtx[tone] || ""}

ANCHOR: Cherry Creek School District — one of Colorado's top districts — is actively using Soundtrap.

STRICT RULES:
1. Subject line first labeled "Subject:"
2. NO asterisks, NO markdown, NO **bold**
3. Lists: "- Item" (dash space)
4. Max 2-3 sentences per paragraph
5. Signature: "Best,\n[Your Name]\nSoundtrap for Education"
6. Plain text only — HubSpot/Outlook ready
7. Under 150 words cold/followup, under 200 demo_recap/trial

Output ONLY subject line and email body.`;
}

// ─── STYLES ───────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --green: #1DB954;
  --green-dark: #169a44;
  --green-glow: rgba(29,185,84,0.12);
  --green-border: rgba(29,185,84,0.28);
  --bg: #0f0f0f;
  --surface: #181818;
  --surface2: #222222;
  --surface3: #2a2a2a;
  --border: rgba(255,255,255,0.07);
  --border-hover: rgba(255,255,255,0.14);
  --text: #f0f0f0;
  --text-dim: rgba(240,240,240,0.62);
  --text-muted: rgba(240,240,240,0.32);
  --hot: #ff4e6a;
  --warm: #b39ddb;
  --mod: #ffca28;
  --radius: 12px;
  --radius-sm: 8px;
  --radius-xs: 5px;
  --font: 'Outfit', sans-serif;
  --mono: 'JetBrains Mono', monospace;
  --nav-w: 72px;
  --top-h: 64px;
}

html, body, #root { height: 100%; background: var(--bg); }
body {
  font-family: var(--font);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  font-size: 15px;
  line-height: 1.5;
}

/* ── SCROLLBARS ── */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 2px; }

/* ── LAYOUT ── */
.app {
  display: grid;
  grid-template-columns: var(--nav-w) 1fr;
  grid-template-rows: var(--top-h) 1fr;
  height: 100vh;
  overflow: hidden;
}

/* ── TOPBAR ── */
.topbar {
  grid-column: 1 / -1;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 16px;
}
.topbar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}
.topbar-icon {
  width: 38px; height: 38px;
  background: var(--green);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 17px; color: #000;
  flex-shrink: 0;
}
.topbar-name {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(90deg, #fff 30%, var(--green) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.topbar-badge {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--green);
  background: var(--green-glow);
  border: 1px solid var(--green-border);
  border-radius: var(--radius-xs);
  padding: 3px 10px;
  letter-spacing: 0.05em;
}
.topbar-count {
  margin-left: auto;
  font-size: 13px;
  color: var(--text-muted);
  font-family: var(--mono);
}
.topbar-count strong { color: var(--text-dim); font-weight: 500; }

/* ── SIDEBAR ── */
.sidebar {
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 8px;
}
.nav-btn {
  width: 48px; height: 48px;
  border-radius: var(--radius-sm);
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  transition: all 0.15s ease;
  position: relative;
}
.nav-btn:hover { background: var(--surface2); color: var(--text); }
.nav-btn.active {
  background: var(--green-glow);
  color: var(--green);
  border: 1px solid var(--green-border);
}
.nav-btn::after {
  content: attr(data-label);
  position: absolute;
  left: 60px;
  background: var(--surface3);
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: var(--radius-xs);
  font-size: 12px;
  font-family: var(--font);
  white-space: nowrap;
  color: var(--text);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  z-index: 100;
}
.nav-btn:hover::after { opacity: 1; }

/* ── MAIN ── */
.main { overflow: hidden; display: flex; flex-direction: column; }

/* ── SPLIT LAYOUT ── */
.split { display: flex; flex: 1; overflow: hidden; }
.list-pane {
  flex: 1;
  overflow-y: auto;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.detail-pane {
  width: 400px;
  flex-shrink: 0;
  background: var(--surface);
  border-left: 1px solid var(--border);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.detail-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 14px;
  color: var(--text-muted);
  text-align: center;
  padding: 32px;
}
.detail-empty-icon { font-size: 40px; opacity: 0.25; }
.detail-empty-text { font-size: 14px; line-height: 1.6; }

/* ── PAGE HEADER ── */
.page-title {
  font-size: 24px;
  font-weight: 700;
  display: flex; align-items: center; gap: 10px;
}
.page-title .accent { color: var(--green); }
.page-subtitle { font-size: 14px; color: var(--text-dim); margin-top: 5px; }

/* ── FILTERS ── */
.filter-bar {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}
.filter-input {
  flex: 1;
  min-width: 220px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: var(--font);
  font-size: 14px;
  padding: 10px 16px;
  outline: none;
  transition: border-color 0.15s;
}
.filter-input:focus { border-color: var(--green); }
.filter-input::placeholder { color: var(--text-muted); }
.filter-select {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: var(--font);
  font-size: 13px;
  padding: 9px 14px;
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.15s;
  min-width: 140px;
}
.filter-select:focus { border-color: var(--green); }
.pill {
  padding: 7px 16px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-dim);
  font-size: 13px;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.pill:hover { border-color: var(--border-hover); color: var(--text); }
.pill.active { background: var(--green-glow); border-color: var(--green-border); color: var(--green); }

/* ── REGION GROUP HEADER ── */
.region-group { display: flex; flex-direction: column; gap: 10px; }
.region-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--green);
  font-family: var(--mono);
  padding: 4px 0;
  border-bottom: 1px solid var(--border);
  margin-top: 8px;
}

/* ── SCHOOL ROW ── */
.school-row {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: grid;
  grid-template-columns: 36px 1fr auto;
  gap: 14px;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s;
}
.school-row:hover {
  border-color: var(--border-hover);
  background: var(--surface2);
  transform: translateX(3px);
}
.school-row.selected {
  border-color: var(--green);
  background: rgba(29,185,84,0.06);
}

/* ── SCORE BADGE ── */
.score-badge {
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700;
  flex-shrink: 0;
}
.score-badge.A  { background: rgba(255,78,106,0.18); color: var(--hot); border: 1px solid rgba(255,78,106,0.3); }
.score-badge.B  { background: rgba(179,157,219,0.18); color: var(--warm); border: 1px solid rgba(179,157,219,0.3); }
.score-badge.C  { background: rgba(255,202,40,0.15); color: var(--mod); border: 1px solid rgba(255,202,40,0.25); }
.score-badge.S  { background: var(--green-glow); color: var(--green); border: 1px solid var(--green-border); }

.school-name { font-size: 14px; font-weight: 600; }
.school-meta {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 3px;
  font-family: var(--mono);
}
.use-badges {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 7px;
}
.use-badge {
  font-size: 10px;
  padding: 2px 7px;
  border-radius: var(--radius-xs);
  font-family: var(--mono);
  background: var(--surface3);
  color: var(--text-muted);
  border: 1px solid var(--border);
}
.use-badge.active {
  background: rgba(29,185,84,0.12);
  color: var(--green);
  border-color: var(--green-border);
}
.school-right { text-align: right; }
.school-type-tag {
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--mono);
}
.school-lms {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 3px;
  font-family: var(--mono);
}

/* ── DETAIL PANEL ── */
.detail-section {
  padding: 22px;
  border-bottom: 1px solid var(--border);
}
.detail-section:last-child { border-bottom: none; }
.detail-section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 12px;
  font-family: var(--mono);
}
.detail-score-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: var(--radius-xs);
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 12px;
}
.detail-school-name { font-size: 20px; font-weight: 700; line-height: 1.3; }
.detail-school-sub { font-size: 13px; color: var(--text-dim); margin-top: 5px; }

.detail-kv { display: flex; justify-content: space-between; margin-bottom: 8px; align-items: baseline; }
.detail-k { font-size: 13px; color: var(--text-muted); }
.detail-v { font-size: 13px; font-weight: 500; text-align: right; max-width: 60%; }

.detail-rationale { font-size: 13px; line-height: 1.7; color: var(--text-dim); }
.detail-notes { font-size: 12px; color: var(--green); margin-top: 10px; font-style: italic; line-height: 1.6; }

.detail-contact-role { font-size: 14px; font-weight: 600; }
.detail-contact-title { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.detail-contact-block { margin-bottom: 14px; }

.detail-li {
  font-size: 11px;
  color: var(--green);
  font-family: var(--mono);
  word-break: break-word;
  line-height: 1.6;
  margin-top: 4px;
}

/* ── BUTTONS ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font);
  cursor: pointer;
  border: none;
  transition: all 0.15s;
  white-space: nowrap;
}
.btn-green { background: var(--green); color: #000; }
.btn-green:hover { background: var(--green-dark); }
.btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text-dim); }
.btn-outline:hover { border-color: var(--border-hover); color: var(--text); }
.btn-ghost { background: var(--surface3); color: var(--text-dim); }
.btn-ghost:hover { background: var(--border-hover); color: var(--text); }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── FULL PAGE PANEL ── */
.full-panel {
  overflow-y: auto;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
}

/* ── CHAT ── */
.chat-layout { display: flex; flex-direction: column; height: 100%; }
.chat-topbar {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}
.agent-avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1DB954, #0d7a35);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; font-weight: 800; color: #000;
  flex-shrink: 0;
}
.agent-name { font-size: 16px; font-weight: 700; }
.agent-status {
  font-size: 12px;
  color: var(--green);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
}
.status-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--green);
  animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

.context-bar {
  padding: 10px 24px;
  background: var(--surface2);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  flex-wrap: wrap;
}
.context-chip {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  background: var(--green-glow);
  color: var(--green);
  border: 1px solid var(--green-border);
  font-family: var(--mono);
  display: flex; align-items: center; gap: 6px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.message { display: flex; gap: 12px; animation: fadeUp 0.2s ease; }
@keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
.message.user { flex-direction: row-reverse; }
.msg-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
}
.msg-avatar.agent { background: linear-gradient(135deg, #1DB954, #0d7a35); color: #000; font-weight: 800; }
.msg-avatar.user { background: var(--surface3); }
.msg-bubble {
  max-width: 74%;
  padding: 13px 17px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
}
.msg-bubble.agent {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 16px 16px 16px 4px;
}
.msg-bubble.user {
  background: var(--green-glow);
  border: 1px solid var(--green-border);
  border-radius: 16px 16px 4px 16px;
}
.typing-indicator { display: flex; gap: 5px; align-items: center; padding: 14px 18px; }
.typing-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: bounce 1.2s infinite;
}
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%,60%,100%{transform:none} 30%{transform:translateY(-5px)} }

.starters-bar {
  padding: 12px 24px 4px;
  display: flex; gap: 8px; flex-wrap: wrap; flex-shrink: 0;
}
.starter {
  padding: 7px 14px;
  border-radius: 20px;
  background: var(--surface2);
  border: 1px solid var(--border);
  font-size: 12px;
  color: var(--text-dim);
  cursor: pointer;
  transition: all 0.15s;
  font-family: var(--font);
}
.starter:hover { border-color: var(--green); color: var(--green); background: var(--green-glow); }

.chat-input-row {
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 10px;
  align-items: flex-end;
  flex-shrink: 0;
}
.chat-textarea {
  flex: 1;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: var(--font);
  font-size: 14px;
  padding: 12px 16px;
  resize: none;
  outline: none;
  min-height: 46px;
  max-height: 120px;
  line-height: 1.5;
  transition: border-color 0.15s;
}
.chat-textarea:focus { border-color: var(--green); }
.chat-textarea::placeholder { color: var(--text-muted); }
.send-btn {
  width: 46px; height: 46px;
  border-radius: var(--radius-sm);
  background: var(--green);
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  color: #000; font-weight: 700;
  transition: all 0.15s;
  flex-shrink: 0;
}
.send-btn:hover { background: var(--green-dark); }
.send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── ERROR BANNER ── */
.error-banner {
  background: rgba(255,78,106,0.1);
  border: 1px solid rgba(255,78,106,0.3);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  font-size: 13px;
  color: #ff4e6a;
  display: flex; gap: 8px; align-items: flex-start;
}

/* ── API KEY BANNER ── */
.api-key-banner {
  background: rgba(255,202,40,0.08);
  border: 1px solid rgba(255,202,40,0.25);
  border-radius: var(--radius);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.api-key-banner h3 { font-size: 16px; font-weight: 600; color: #ffca28; }
.api-key-banner p { font-size: 14px; color: var(--text-dim); line-height: 1.7; }
.api-key-banner code {
  background: var(--surface3);
  border: 1px solid var(--border);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--green);
}

/* ── EMAIL BUILDER ── */
.email-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
@media (max-width: 900px) { .email-grid { grid-template-columns: 1fr; } }

.field-label { font-size: 12px; font-weight: 600; color: var(--text-dim); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em; }
.field-select {
  width: 100%;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: var(--font);
  font-size: 14px;
  padding: 11px 14px;
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.15s;
}
.field-select:focus { border-color: var(--green); }

.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }
.select-card {
  padding: 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface2);
  cursor: pointer;
  transition: all 0.15s;
}
.select-card:hover { border-color: var(--border-hover); }
.select-card.selected { border-color: var(--green); background: var(--green-glow); }
.select-card-icon { font-size: 22px; margin-bottom: 7px; }
.select-card-label { font-size: 12px; font-weight: 600; line-height: 1.4; }
.select-card-sub { font-size: 11px; color: var(--text-muted); margin-top: 3px; }

.qual-bar { display: flex; gap: 7px; flex-wrap: wrap; }
.qual-pill {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--surface2);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  color: var(--text-dim);
  font-family: var(--font);
}
.qual-pill:hover { border-color: var(--border-hover); color: var(--text); }
.qual-pill.active { border-color: var(--green-border); background: var(--green-glow); color: var(--green); }

.email-output {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.8;
  white-space: pre-wrap;
  color: var(--text-dim);
  min-height: 200px;
}
.email-output.has-content { color: var(--text); }
.email-output.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  color: var(--text-muted);
  font-family: var(--font);
  font-size: 14px;
  text-align: center;
  min-height: 300px;
}

/* ── PIPELINE DASHBOARD ── */
.stat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 14px; }
.stat-card {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
}
.stat-value { font-size: 32px; font-weight: 800; color: var(--green); }
.stat-label { font-size: 12px; color: var(--text-muted); margin-top: 4px; font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.05em; }
.stat-bar { height: 3px; background: var(--surface3); border-radius: 2px; margin-top: 12px; overflow: hidden; }
.stat-bar-fill { height: 100%; border-radius: 2px; background: var(--green); }

.panel-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.panel-card-header {
  padding: 16px 22px;
  border-bottom: 1px solid var(--border);
}
.panel-card-title { font-size: 13px; font-weight: 600; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.06em; }
.panel-card-body { padding: 16px 22px; }

.district-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.district-row:last-child { border-bottom: none; }
.district-name { flex: 1; font-size: 14px; font-weight: 500; }
.district-count { font-size: 12px; color: var(--text-muted); font-family: var(--mono); }

.use-stat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
.use-stat {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px;
}
.use-stat-icon { font-size: 24px; margin-bottom: 8px; }
.use-stat-num { font-size: 26px; font-weight: 800; color: var(--green); }
.use-stat-label { font-size: 11px; color: var(--text-muted); margin-top: 3px; font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.05em; }

.script-card {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px;
  margin-bottom: 10px;
}
.script-tag {
  font-size: 10px;
  font-family: var(--mono);
  color: var(--green);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}
.script-text { font-size: 13px; color: var(--text-dim); line-height: 1.7; }


/* ── PIPELINE INTERACTIVE ── */
.stat-card {
  cursor: pointer;
  transition: all 0.15s ease;
}
.stat-card:hover {
  border-color: var(--green-border);
  background: rgba(29,185,84,0.06);
  transform: translateY(-2px);
}
.stat-card.active-filter {
  border-color: var(--green);
  background: rgba(29,185,84,0.1);
}
.stat-card-hint {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 6px;
  font-family: var(--mono);
  opacity: 0;
  transition: opacity 0.15s;
}
.stat-card:hover .stat-card-hint { opacity: 1; }

.pipeline-action-bar {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 14px 18px;
  background: var(--surface2);
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}
.pipeline-filter-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: var(--green-glow);
  border: 1px solid var(--green-border);
  border-radius: 20px;
  font-size: 12px;
  color: var(--green);
  font-family: var(--mono);
}
.pipeline-filter-chip button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--green);
  font-size: 13px;
  padding: 0;
  line-height: 1;
  opacity: 0.7;
}
.pipeline-filter-chip button:hover { opacity: 1; }

.district-row {
  cursor: pointer;
  transition: all 0.15s;
  border-radius: var(--radius-xs);
  padding: 12px 16px;
}
.district-row:hover {
  background: var(--surface2);
  transform: translateX(3px);
}
.district-bar-wrap {
  width: 80px;
  height: 4px;
  background: var(--surface3);
  border-radius: 2px;
  overflow: hidden;
  flex-shrink: 0;
}
.district-bar {
  height: 100%;
  background: var(--green);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.region-breakdown {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.region-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.15s;
}
.region-row:last-child { border-bottom: none; }
.region-row:hover { color: var(--green); }
.region-row:hover .region-name { color: var(--green); }
.region-name { font-size: 13px; font-weight: 500; flex: 1; }
.region-counts { font-size: 11px; color: var(--text-muted); font-family: var(--mono); }
.region-score-pills { display: flex; gap: 4px; }
.score-pill {
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 10px;
  font-family: var(--mono);
  font-weight: 600;
}
.score-pill.A { background: rgba(255,78,106,0.15); color: var(--hot); }
.score-pill.B { background: rgba(179,157,219,0.15); color: var(--warm); }
.score-pill.S { background: var(--green-glow); color: var(--green); }

.pipeline-insight {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-left: 3px solid var(--green);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  font-size: 13px;
  color: var(--text-dim);
  line-height: 1.7;
}
.pipeline-insight strong { color: var(--text); }

.use-stat:hover {
  border-color: var(--green-border);
  cursor: pointer;
  transform: translateY(-2px);
  transition: all 0.15s;
}

/* ── CONTEXT / PASTE AREAS ── */
.context-input-zone {
  background: var(--surface2);
  border: 1px dashed rgba(29,185,84,0.35);
  border-radius: var(--radius);
  padding: 16px;
  transition: all 0.2s ease;
}
.context-input-zone:focus-within {
  border-color: var(--green);
  border-style: solid;
  background: rgba(29,185,84,0.04);
}
.context-input-zone:hover {
  border-color: rgba(29,185,84,0.5);
}
.context-zone-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--green);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-family: var(--mono);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.context-zone-hint {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 6px;
  line-height: 1.6;
}
.context-textarea {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-family: var(--font);
  font-size: 13px;
  line-height: 1.65;
  resize: vertical;
  min-height: 80px;
  max-height: 200px;
}
.context-textarea::placeholder { color: var(--text-muted); font-style: italic; }

.context-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  background: rgba(29,185,84,0.1);
  border: 1px solid var(--green-border);
  border-radius: 20px;
  font-size: 10px;
  color: var(--green);
  font-family: var(--mono);
  cursor: pointer;
  transition: all 0.15s;
}
.context-badge:hover { background: rgba(29,185,84,0.18); }
.context-badge.active { background: rgba(29,185,84,0.18); }

/* email builder step labels */
.step-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--surface3);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-dim);
  flex-shrink: 0;
  font-family: var(--mono);
}
.step-num.done {
  background: var(--green-glow);
  border-color: var(--green-border);
  color: var(--green);
}
.step-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* chat paste hint */
.chat-paste-hint {
  margin: 0 18px 8px;
  padding: 10px 14px;
  background: rgba(29,185,84,0.06);
  border: 1px dashed rgba(29,185,84,0.25);
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: text;
  transition: all 0.15s;
}
.chat-paste-hint:hover {
  border-color: rgba(29,185,84,0.4);
  color: var(--text-dim);
}

/* ── TOAST ── */
.toast {
  position: fixed;
  bottom: 28px; right: 28px;
  background: var(--surface3);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 13px 20px;
  font-size: 13px;
  z-index: 1000;
  animation: toastIn 0.2s ease;
  display: flex;
  align-items: center;
  gap: 9px;
}
@keyframes toastIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
.toast-icon { color: var(--green); font-size: 16px; }
`;

// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const STARTERS = [
  "How do I pitch a music teacher I've never spoken to?",
  "Best angle for a STEM school without a music program?",
  "How do I handle 'we already use GarageBand'?",
  "Opening line for a cold email to a charter principal?",
  "Fastest path to close Lotus School for Excellence?",
  "Walk me through a full outreach sequence for an IB school.",
  "Classroom plan vs. School plan — which do I pitch?",
  "How do I use Cherry Creek as social proof without sounding scripted?",
];

const ROLES = [
  { id: "music_teacher",  label: "Music Teacher / Band Dir.", icon: "🎵" },
  { id: "stem_teacher",   label: "Science / STEM Teacher",   icon: "🔬" },
  { id: "ela_teacher",    label: "ELA / English Teacher",    icon: "📖" },
  { id: "world_language", label: "World Language Teacher",   icon: "🌍" },
  { id: "sped",           label: "Special Ed / SLP",         icon: "♿" },
  { id: "principal",      label: "Principal",                icon: "🏫" },
  { id: "exec_director",  label: "Executive Director",       icon: "⭐" },
  { id: "fine_arts_dir",  label: "Fine Arts Director",       icon: "🎭" },
  { id: "curriculum_dir", label: "Curriculum / IT Director", icon: "🖥️" },
  { id: "activities_dir", label: "Activities / Journalism",  icon: "🎙️" },
];

const TONES = [
  { id: "cold",       label: "Cold Outreach",   desc: "First touch" },
  { id: "followup",   label: "Follow-Up",       desc: "No reply yet" },
  { id: "demo_recap", label: "Post-Demo Recap", desc: "After a call" },
  { id: "trial",      label: "Trial Activation",desc: "Starting trial" },
];

const QUALS = [
  "Has Music Program", "Has Podcast / Media Program", "STEM Focus",
  "IB Program", "Charter School", "Uses Canvas LMS",
  "Uses Google Classroom", "K-12 Multi-grade", "Cherry Creek Proximity",
];

// ─── API CALL — routes through /api/chat serverless function ─────────────
async function callProxy(messages, system) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, system }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `Server error ${res.status}`);
  }
  const data = await res.json();
  return data?.content?.[0]?.text || "No response received.";
}

// ─── APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("prospects");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("ALL");
  const [useFilter, setUseFilter] = useState("ALL");
  const [regionFilter, setRegionFilter] = useState("ALL");
  const [districtFilter, setDistrictFilter] = useState("ALL");

  // Chat
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "Hey — I\'m PITCH, your Soundtrap for Education sales intelligence agent.\n\nI have 241 schools across 77 Colorado districts in my database. Ask me about any school, any district, any buyer persona, or how to handle any objection.\n\nWhat are you working on?"
  }]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatContext, setChatContext] = useState(null);
  const [chatError, setChatError] = useState(null);
  const messagesEndRef = useRef(null);

  // Pipeline interactive filters
  const [pipelineFilter, setPipelineFilter] = useState(null); // null | "A" | "B" | "SIGNED" | region string
  const [pipelineFilterLabel, setPipelineFilterLabel] = useState("");

  // Context paste fields
  const [emailContext, setEmailContext] = useState("");
  const [chatPasteContext, setChatPasteContext] = useState("");
  const [chatPasteVisible, setChatPasteVisible] = useState(false);

  // Email
  const [eSchool, setESchool] = useState("");
  const [eRole, setERole] = useState("");
  const [eTone, setETone] = useState("");
  const [eQuals, setEQuals] = useState([]);
  const [eOutput, setEOutput] = useState("");
  const [eLoading, setELoading] = useState(false);
  const [eError, setEError] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  // ── FILTERING ────────────────────────────────────────────────────────────
  const filtered = SCHOOLS.filter(s => {
    const q = search.toLowerCase();
    const mq = !q || s.name.toLowerCase().includes(q) || s.district.toLowerCase().includes(q) || s.city.toLowerCase().includes(q) || s.county.toLowerCase().includes(q);
    const ms = scoreFilter === "ALL" || (scoreFilter === "SIGNED" ? s.status === "SIGNED" : s.score === scoreFilter && s.status !== "SIGNED");
    const mu = useFilter === "ALL" || (useFilter === "music" && s.music) || (useFilter === "media" && s.media) || (useFilter === "stem" && s.stem) || (useFilter === "ela" && s.ela) || (useFilter === "sped" && s.sped);
    const mr = regionFilter === "ALL" || s.region === regionFilter;
    const md = districtFilter === "ALL" || s.district === districtFilter;
    return mq && ms && mu && mr && md;
  });

  const grouped = filtered.reduce((acc, s) => {
    if (!acc[s.region]) acc[s.region] = [];
    acc[s.region].push(s);
    return acc;
  }, {});

  // ── CHAT ─────────────────────────────────────────────────────────────────
  const sendChat = useCallback(async (textOverride) => {
    const text = (textOverride || chatInput).trim();
    if (!text || chatLoading) return;
    setChatInput("");
    setChatError(null);
    const ctxNote = chatContext
      ? `\n\n[CONTEXT: Rep is viewing ${chatContext.name}, ${chatContext.district}, ${chatContext.region}. Use case: ${chatContext.useCase}. Rationale: ${chatContext.rationale}]`
      : "";
    const pasteNote = chatPasteContext.trim()
      ? `\n\n[ADDITIONAL CONTEXT FROM REP:\n${chatPasteContext.trim()}]`
      : "";
    const userMsg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setChatLoading(true);
    try {
      const history = [...messages, userMsg];
      const reply = await callProxy(
        history.map(m => ({ role: m.role, content: m.content })),
        SYS + ctxNote + pasteNote
      );
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      const msg = err.message || "Connection error. Please try again.";
      setChatError(msg);
      setMessages(prev => [...prev, { role: "assistant", content: "Hit an error — " + msg }]);
    } finally {
      setChatLoading(false);
    }
  }, [chatInput, chatLoading, chatContext, messages]);

  // ── EMAIL ────────────────────────────────────────────────────────────────
  const generateEmail = useCallback(async () => {
    if (!eSchool || !eRole || !eTone) { setEError("Select a school, buyer role, and email type."); return; }
    setEError(null); setELoading(true); setEOutput("");
    const school = SCHOOLS.find(s => s.id === Number(eSchool));
    if (!school) { setEError("School not found."); setELoading(false); return; }
    try {
      const contextBlock = emailContext.trim() ? `\n\nADDITIONAL CONTEXT FROM REP:\n${emailContext.trim()}` : "";
      const reply = await callProxy(
        [{ role: "user", content: buildEmailPrompt(school, eRole, eTone, eQuals) + contextBlock }],
        ""
      );
      setEOutput(reply);
    } catch (err) {
      setEError(err.message || "Connection error. Please try again.");
    } finally {
      setELoading(false);
    }
  }, [eSchool, eRole, eTone, eQuals]);

  // ── STATS (real counts only, no made-up financials) ─────────────────────
  const signedCount = SCHOOLS.filter(s => s.status === "SIGNED").length;

  // Pipeline region breakdown
  const regionMap = {};
  SCHOOLS.forEach(s => {
    if (!regionMap[s.region]) regionMap[s.region] = { total: 0, A: 0, B: 0, signed: 0 };
    regionMap[s.region].total++;
    if (s.status === "SIGNED") regionMap[s.region].signed++;
    else if (s.score === "A") regionMap[s.region].A++;
    else if (s.score === "B") regionMap[s.region].B++;
  });
  const regionBreakdown = Object.entries(regionMap).sort((a,b) => b[1].A - a[1].A);

  // Top insight: find the best unworked territory
  const topRegion = regionBreakdown[0];
  const hotDistricts = topDistricts.filter(([,d]) => d.hotCount > 0);
  const hotCount    = SCHOOLS.filter(s => s.score === "A" && s.status !== "SIGNED").length;
  const warmCount   = SCHOOLS.filter(s => s.score === "B").length;

  const distMap = {};
  SCHOOLS.forEach(s => {
    if (!distMap[s.district]) distMap[s.district] = { count: 0, hotCount: 0, ppr: s.ppr, region: s.region };
    distMap[s.district].count++;
    if (s.score === "A" && s.status !== "SIGNED") distMap[s.district].hotCount++;
  });
  const topDistricts = Object.entries(distMap).sort((a, b) => b[1].hotCount - a[1].hotCount || b[1].count - a[1].count).slice(0, 12);

  const getScoreBg = (s) => {
    if (s.status === "SIGNED") return { bg: "rgba(29,185,84,.12)", border: "rgba(29,185,84,.3)", color: "#1DB954" };
    if (s.score === "A") return { bg: "rgba(255,78,106,.12)", border: "rgba(255,78,106,.3)", color: "#ff4e6a" };
    if (s.score === "B") return { bg: "rgba(179,157,219,.12)", border: "rgba(179,157,219,.3)", color: "#b39ddb" };
    return { bg: "rgba(255,202,40,.1)", border: "rgba(255,202,40,.25)", color: "#ffca28" };
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div className="app">

        
        <div className="topbar">
          <div className="topbar-logo">
            <div className="topbar-icon">P</div>
            <div className="topbar-name">PITCH</div>
            <div className="topbar-badge">Soundtrap for Education</div>
          </div>
          <div className="topbar-count">
            <strong>{SCHOOLS.length}</strong> schools &nbsp;·&nbsp; <strong>{Object.keys(distMap).length}</strong> districts &nbsp;·&nbsp; Colorado
          </div>
        </div>
        <div className="sidebar">
          {[
            { id: "prospects", icon: "🎯", label: "Prospects" },
            { id: "chat",      icon: "🤖", label: "PITCH AI" },
            { id: "email",     icon: "✉️",  label: "Email Builder" },
            { id: "pipeline",  icon: "📊",  label: "Pipeline" },
          ].map(n => (
            <button
              key={n.id}
              className={`nav-btn ${tab === n.id ? "active" : ""}`}
              onClick={() => setTab(n.id)}
              data-label={n.label}
            >
              {n.icon}
            </button>
          ))}
        </div>
        <div className="main">

          
          {tab === "prospects" && (
            <div className="split">
              <div className="list-pane">
                <div>
                  <div className="page-title">
                    Prospect Intelligence
                    <span className="accent">·</span>
                    <span style={{ fontSize: "18px", color: "var(--text-dim)", fontWeight: 500 }}>{filtered.length} schools</span>
                  </div>
                  <div className="page-subtitle">
                    241 schools across 77 Colorado districts. Click any school for full intelligence and contact strategy.
                  </div>
                </div>

                <div className="filter-bar">
                  <input
                    className="filter-input"
                    placeholder="Search school, district, city, county…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <select className="filter-select" value={regionFilter} onChange={e => setRegionFilter(e.target.value)}>
                    <option value="ALL">All Regions</option>
                    {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <select className="filter-select" value={districtFilter} onChange={e => setDistrictFilter(e.target.value)}>
                    <option value="ALL">All Districts</option>
                    {DISTRICT_LIST.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div className="filter-bar">
                  {[
                    ["ALL", "All Scores"],
                    ["SIGNED", "⭐ Signed"],
                    ["A", "🔥 HOT"],
                    ["B", "✅ Warm"],
                    ["C", "🔷 Moderate"],
                  ].map(([v, l]) => (
                    <button key={v} className={`pill ${scoreFilter === v ? "active" : ""}`} onClick={() => setScoreFilter(v)}>{l}</button>
                  ))}
                  {[
                    ["ALL", "All Use Cases"],
                    ["music", "🎵 Music"],
                    ["media", "🎙️ Podcast"],
                    ["stem", "🔬 STEM"],
                    ["ela", "📖 ELA"],
                    ["sped", "♿ Sped"],
                  ].map(([v, l]) => (
                    <button key={v} className={`pill ${useFilter === v ? "active" : ""}`} onClick={() => setUseFilter(v)}>{l}</button>
                  ))}
                </div>

                {Object.entries(grouped).map(([region, schools]) => (
                  <div key={region} className="region-group">
                    {(regionFilter === "ALL" && districtFilter === "ALL") && (
                      <div className="region-label">{region} — {schools.length} school{schools.length !== 1 ? "s" : ""}</div>
                    )}
                    {schools.map(s => {
                      const sc = getScoreBg(s);
                      return (
                        <div
                          key={s.id}
                          className={`school-row ${selected?.id === s.id ? "selected" : ""}`}
                          onClick={() => setSelected(selected?.id === s.id ? null : s)}
                        >
                          <div className={`score-badge ${s.status === "SIGNED" ? "S" : s.score}`}>
                            {s.status === "SIGNED" ? "✓" : s.score}
                          </div>
                          <div>
                            <div className="school-name">{s.name}</div>
                            <div className="school-meta">{s.district} · {s.city} · {s.grades}</div>
                            <div className="use-badges">
                              {[["🎵", "music"], ["🎙️", "media"], ["🔬", "stem"], ["📖", "ela"], ["♿", "sped"]].map(([ico, key]) => (
                                <span key={key} className={`use-badge ${s[key] ? "active" : ""}`}>{ico}</span>
                              ))}
                            </div>
                          </div>
                          <div className="school-right">
                            <div className="school-type-tag">{s.type}</div>
                            <div className="school-lms">{s.lms}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="detail-pane">
                {selected ? (
                  <>
                    <div className="detail-section">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                        <div style={{ flex: 1 }}>
                          {(() => {
                            const sc = getScoreBg(selected);
                            const lbl = selected.status === "SIGNED" ? "⭐ SIGNED" : selected.score === "A" ? "🔥 HOT — Close Now" : selected.score === "B" ? "✅ WARM" : "🔷 MODERATE";
                            return (
                              <div className="detail-score-pill" style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}>
                                {lbl}
                              </div>
                            );
                          })()}
                          <div className="detail-school-name">{selected.name}</div>
                          <div className="detail-school-sub">{selected.district} · {selected.city} · {selected.region}</div>
                        </div>
                        <button className="btn btn-ghost" style={{ padding: "7px 11px", fontSize: "13px" }} onClick={() => setSelected(null)}>✕</button>
                      </div>
                    </div>

                    <div className="detail-section">
                      <div className="detail-section-label">Account Profile</div>
                      {[
                        ["School Type", selected.type],
                        ["Grades", selected.grades],
                        ["County", selected.county],
                        ["LMS", selected.lms],
                      ].map(([k, v]) => (
                        <div className="detail-kv" key={k}>
                          <span className="detail-k">{k}</span>
                          <span className="detail-v">{v}</span>
                        </div>
                      ))}
                    </div>

                    <div className="detail-section">
                      <div className="detail-section-label">Soundtrap Use Cases</div>
                      <div className="use-badges" style={{ marginBottom: "10px" }}>
                        {selected.music && <span className="use-badge active">🎵 Music</span>}
                        {selected.media && <span className="use-badge active">🎙️ Podcast</span>}
                        {selected.stem  && <span className="use-badge active">🔬 STEM</span>}
                        {selected.ela   && <span className="use-badge active">📖 ELA</span>}
                        {selected.sped  && <span className="use-badge active">♿ Sped/SEL</span>}
                      </div>
                      <div style={{ fontSize: "13px", color: "var(--text-dim)", lineHeight: "1.6" }}>{selected.useCase}</div>
                    </div>

                    <div className="detail-section">
                      <div className="detail-section-label">Why They Buy</div>
                      <div className="detail-rationale">{selected.rationale}</div>
                      {selected.notes && <div className="detail-notes">{selected.notes}</div>}
                    </div>

                    <div className="detail-section">
                      <div className="detail-section-label">Scoring Rationale — {selected.scorePts} pts</div>
                      <div style={{fontSize:"11px",color:"var(--text-muted)",marginBottom:"10px",lineHeight:"1.5"}}>
                        Based on: CDE per-pupil spending (2023-24), charter purchase authority, program fit, Cherry Creek proximity, and district FRL%. Source: COSFP public data.
                      </div>
                      {selected.scoreReasons && selected.scoreReasons.map((r,i) => (
                        <div key={i} style={{display:"flex",gap:"8px",marginBottom:"7px",alignItems:"flex-start"}}>
                          <span style={{color:"var(--green)",fontSize:"12px",flexShrink:0,marginTop:"1px"}}>+</span>
                          <span style={{fontSize:"12px",color:"var(--text-dim)",lineHeight:"1.6"}}>{r}</span>
                        </div>
                      ))}
                      <div style={{marginTop:"12px",padding:"10px 12px",background:"var(--surface3)",borderRadius:"var(--radius-xs)",fontSize:"11px",color:"var(--text-muted)",lineHeight:"1.6"}}>
                        <strong style={{color:"var(--text-dim)"}}>District budget:</strong> ${selected.ppr?.toLocaleString()}/pupil/yr (CDE 2023-24) &nbsp;·&nbsp;
                        <strong style={{color:"var(--text-dim)"}}>FRL:</strong> ~{selected.frl}%
                      </div>
                    </div>

                    <div className="detail-section">
                      <div className="detail-section-label">Contact Strategy</div>
                      <div className="detail-contact-block">
                        <div className="detail-contact-role">Champion: {selected.contact.champion}</div>
                      </div>
                      <div className="detail-contact-block">
                        <div className="detail-contact-role">Budget Approver: {selected.contact.approver}</div>
                      </div>
                      <div className="detail-kv">
                        <span className="detail-k">Phone</span>
                        <a
                          href={`tel:${selected.contact.phone}`}
                          style={{ fontSize: "13px", color: "var(--green)", fontFamily: "var(--mono)", textDecoration: "none" }}
                          onMouseOver={e => e.target.style.textDecoration = "underline"}
                          onMouseOut={e => e.target.style.textDecoration = "none"}
                        >
                          {selected.contact.phone}
                        </a>
                      </div>
                      <div className="detail-kv">
                        <span className="detail-k">Website</span>
                        <a
                          href={selected.contact.site.startsWith("http") ? selected.contact.site : `https://${selected.contact.site}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: "13px", color: "var(--green)", fontFamily: "var(--mono)", textDecoration: "none", maxWidth: "60%", textAlign: "right", wordBreak: "break-all" }}
                          onMouseOver={e => e.target.style.textDecoration = "underline"}
                          onMouseOut={e => e.target.style.textDecoration = "none"}
                        >
                          {selected.contact.site}
                        </a>
                      </div>
                      <div style={{ marginTop: "12px", fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--mono)" }}>
                        LinkedIn — find the contact
                      </div>
                      <a
                        href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(selected.contact.li)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-li"
                        style={{ display: "block", marginTop: "4px", textDecoration: "none", cursor: "pointer" }}
                        onMouseOver={e => e.target.style.opacity = "0.8"}
                        onMouseOut={e => e.target.style.opacity = "1"}
                        title="Open LinkedIn search in new tab"
                      >
                        🔍 {selected.contact.li}
                      </a>
                    </div>

                    <div className="detail-section">
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button className="btn btn-green" onClick={() => { setChatContext(selected); setTab("chat"); showToast(`Context: ${selected.name}`); }}>
                          🤖 Ask PITCH About This School
                        </button>
                        <button className="btn btn-outline" onClick={() => { setESchool(String(selected.id)); setTab("email"); }}>
                          ✉️ Build Email
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="detail-empty">
                    <div className="detail-empty-icon">🎯</div>
                    <div className="detail-empty-text">
                      Select a school to view full intelligence, contact strategy, and use case rationale.
                      <br /><br />
                      <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{SCHOOLS.length} schools · {Object.keys(distMap).length} districts</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          
          {tab === "chat" && (
            <div className="chat-layout">
              <div className="chat-topbar">
                <div className="agent-avatar">P</div>
                <div>
                  <div className="agent-name">PITCH — Sales Intelligence Agent</div>
                  <div className="agent-status"><span className="status-dot"></span> Online · Soundtrap for Education Expert</div>
                </div>
                {chatContext && (
                  <button className="btn btn-ghost" style={{ marginLeft: "auto" }} onClick={() => setChatContext(null)}>
                    Clear context
                  </button>
                )}
              </div>

              {chatContext && (
                <div className="context-bar">
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Viewing:</span>
                  <div className="context-chip">
                    {chatContext.name}
                    <span style={{ cursor: "pointer", opacity: 0.6 }} onClick={() => setChatContext(null)}>✕</span>
                  </div>
                </div>
              )}

              <div className="messages">
                {messages.map((m, i) => (
                  <div key={i} className={`message ${m.role === "user" ? "user" : ""}`}>
                    <div className={`msg-avatar ${m.role === "assistant" ? "agent" : "user"}`}>
                      {m.role === "assistant" ? "P" : "👤"}
                    </div>
                    <div className={`msg-bubble ${m.role === "assistant" ? "agent" : "user"}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="message">
                    <div className="msg-avatar agent">P</div>
                    <div className="msg-bubble agent">
                      <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                )}
                {chatError && (
                  <div className="error-banner">
                    ⚠️ {chatError}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {messages.length === 1 && (
                <div className="starters-bar">
                  {STARTERS.slice(0, 4).map((s, i) => (
                    <button key={i} className="starter" onClick={() => sendChat(s)}>{s}</button>
                  ))}
                </div>
              )}

              {chatPasteVisible && (
                <div style={{padding:"0 18px 10px"}}>
                  <div className="context-input-zone">
                    <div className="context-zone-label">
                      <span>📋 Context Window — paste notes, emails, call logs, or any background</span>
                      <button
                        style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)",fontSize:"14px",padding:"0"}}
                        onClick={() => { setChatPasteContext(""); setChatPasteVisible(false); }}
                      >✕</button>
                    </div>
                    <textarea
                      className="context-textarea"
                      placeholder={"Paste anything here before sending your message:\n\n• Call notes or email thread\n• A prospect's LinkedIn bio or school website info\n• An objection they raised\n• A script or proof point from the Pipeline tab\n\nPITCH AI will use this context in its response."}
                      value={chatPasteContext}
                      onChange={e => setChatPasteContext(e.target.value)}
                      rows={4}
                    />
                    <div className="context-zone-hint">
                      This context is included with your next message. It stays active until you clear it or close this panel.
                    </div>
                  </div>
                </div>
              )}

              <div className="chat-input-row">
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:"6px"}}>
                  {!chatPasteVisible && (
                    <button
                      className="btn btn-ghost"
                      style={{alignSelf:"flex-start",fontSize:"11px",padding:"4px 12px",marginBottom:"2px"}}
                      onClick={() => setChatPasteVisible(true)}
                    >
                      📋 Paste context or notes
                    </button>
                  )}
                  <textarea
                    className="chat-textarea"
                    placeholder="Ask about a school, district, buyer persona, objection, or deal structure…"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
                  rows={1}
                  />
                </div>
                <button className="send-btn" onClick={() => sendChat()} disabled={chatLoading || !chatInput.trim()}>↑</button>
              </div>
            </div>
          )}

          
          {tab === "email" && (
            <div className="full-panel">
              <div>
                <div className="page-title">Email Builder <span className="accent">·</span> <span style={{ fontSize: "18px", color: "var(--text-dim)", fontWeight: 500 }}>Copy-Paste Ready</span></div>
                <div className="page-subtitle">Generates HubSpot and Outlook-ready emails. No asterisks. No markdown. Plain text only.</div>
              </div>

              <div className="email-grid">
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <div className="step-label">
                      <div className={`step-num ${eSchool ? "done" : ""}`}>1</div>
                      <div className="step-title">Select School</div>
                    </div>
                    <select className="field-select" value={eSchool} onChange={e => setESchool(e.target.value)}>
                      <option value="">— Choose a school ({SCHOOLS.length} available) —</option>
                      {SCHOOLS.map(s => (
                        <option key={s.id} value={s.id}>
                          [{s.status === "SIGNED" ? "SIGNED" : s.score}] {s.name} · {s.district}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="step-label">
                      <div className={`step-num ${eRole ? "done" : ""}`}>2</div>
                      <div className="step-title">Buyer Role</div>
                    </div>
                    <div className="card-grid">
                      {ROLES.map(r => (
                        <div key={r.id} className={`select-card ${eRole === r.id ? "selected" : ""}`} onClick={() => setERole(r.id)}>
                          <div className="select-card-icon">{r.icon}</div>
                          <div className="select-card-label">{r.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="step-label">
                      <div className={`step-num ${eTone ? "done" : ""}`}>3</div>
                      <div className="step-title">Email Type</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      {TONES.map(t => (
                        <div key={t.id} className={`select-card ${eTone === t.id ? "selected" : ""}`} onClick={() => setETone(t.id)}>
                          <div className="select-card-label">{t.label}</div>
                          <div className="select-card-sub">{t.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="step-label">
                      <div className="step-num">4</div>
                      <div className="step-title">Qualifiers (optional)</div>
                    </div>
                    <div className="qual-bar">
                      {QUALS.map(q => (
                        <button
                          key={q}
                          className={`qual-pill ${eQuals.includes(q) ? "active" : ""}`}
                          onClick={() => setEQuals(prev => prev.includes(q) ? prev.filter(x => x !== q) : [...prev, q])}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="step-label">
                      <div className={`step-num ${emailContext ? "done" : ""}`}>5</div>
                      <div className="step-title">Paste Context — Optional but powerful</div>
                    </div>
                    <div className="context-input-zone">
                      <div className="context-zone-label">
                        <span>📋 Context Window</span>
                        {emailContext && (
                          <span style={{fontSize:"10px",padding:"2px 8px",background:"var(--green-glow)",border:"1px solid var(--green-border)",borderRadius:"4px",marginLeft:"auto",color:"var(--green)"}}>
                            ✓ Context active
                          </span>
                        )}
                      </div>
                      <textarea
                        className="context-textarea"
                        placeholder={"Paste anything here that should shape the email:\n\n• Notes from a prior call with this school\n• The prospect's title or LinkedIn bio\n• A specific proof point or objection to address\n• Content pushed here from the Pipeline tab\n\nThe more specific your context, the sharper the output."}
                        value={emailContext}
                        onChange={e => setEmailContext(e.target.value)}
                        rows={4}
                      />
                      {emailContext && (
                        <div style={{display:"flex",justifyContent:"flex-end",marginTop:"6px"}}>
                          <button className="btn btn-ghost" style={{fontSize:"11px",padding:"4px 10px"}} onClick={() => setEmailContext("")}>
                            Clear
                          </button>
                        </div>
                      )}
                      <div className="context-zone-hint">
                        This window feeds directly into the generation prompt. You can also push content here using the "Send to Email" buttons on the Pipeline tab scripts.
                      </div>
                    </div>
                  </div>

                  {eError && <div className="error-banner">⚠️ {eError}</div>}

                  <button
                    className="btn btn-green"
                    style={{ padding: "13px 28px", fontSize: "14px", alignSelf: "flex-start" }}
                    onClick={generateEmail}
                    disabled={eLoading}
                  >
                    {eLoading ? "Generating…" : "✉️ Generate Email"}
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="field-label">Generated Email</div>
                  {eOutput ? (
                    <>
                      <div className="email-output has-content">{eOutput}</div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button className="btn btn-green" onClick={() => navigator.clipboard.writeText(eOutput).then(() => showToast("Email copied to clipboard"))}>
                          📋 Copy to Clipboard
                        </button>
                        <button className="btn btn-ghost" onClick={() => setEOutput("")}>Clear</button>
                        <button className="btn btn-outline" onClick={generateEmail} disabled={eLoading}>Regenerate</button>
                      </div>
                    </>
                  ) : (
                    <div className="email-output empty-state">
                      <span style={{ fontSize: "36px", opacity: 0.2 }}>✉️</span>
                      <span>Configure the options on the left and click Generate Email.</span>
                      <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Output will be plain text — ready to paste into HubSpot, Outlook, or Gmail.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          
          {tab === "pipeline" && (
            <div className="full-panel">
              <div>
                <div className="page-title">Pipeline Overview</div>
                <div className="page-subtitle" style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
                  <span>Click any card, region, or district to jump to filtered prospects. Scores from CDE 2023-24 public data.</span>
                  {pipelineFilter && (
                    <span className="pipeline-filter-chip">
                      Active filter: {pipelineFilterLabel}
                      <button onClick={() => { setPipelineFilter(null); setPipelineFilterLabel(""); setScoreFilter("ALL"); }}>✕</button>
                    </span>
                  )}
                </div>
              </div>

              <div className="stat-grid">
                {[
                  { v: SCHOOLS.length, l: "Total Schools", sub: "All CO K-12", p: 100, filter: null },
                  { v: Object.keys(distMap).length, l: "Districts", sub: "77 across CO", p: 100, filter: null },
                  { v: signedCount, l: "Signed", sub: "Cherry Creek SD", p: Math.round(signedCount/SCHOOLS.length*100), filter: "SIGNED" },
                  { v: hotCount, l: "HOT — Score A", sub: "Fast close, 1-2 calls", p: Math.round(hotCount/SCHOOLS.length*100), filter: "A" },
                  { v: warmCount, l: "Warm — Score B", sub: "2-3 call cycle", p: Math.round(warmCount/SCHOOLS.length*100), filter: "B" },
                  { v: SCHOOLS.filter(s=>s.score==="C"&&s.status!=="SIGNED").length, l: "Moderate — Score C", sub: "Longer cycle", p: Math.round(SCHOOLS.filter(s=>s.score==="C"&&s.status!=="SIGNED").length/SCHOOLS.length*100), filter: "C" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`stat-card ${pipelineFilter === s.filter && s.filter ? "active-filter" : ""}`}
                    onClick={() => {
                      if (!s.filter) return;
                      if (pipelineFilter === s.filter) {
                        setPipelineFilter(null); setPipelineFilterLabel(""); setScoreFilter("ALL");
                      } else {
                        setPipelineFilter(s.filter); setPipelineFilterLabel(s.l);
                        setScoreFilter(s.filter); setTab("prospects");
                      }
                    }}
                    style={{ cursor: s.filter ? "pointer" : "default" }}
                  >
                    <div className="stat-value">{s.v}</div>
                    <div className="stat-label">{s.l}</div>
                    <div style={{fontSize:"11px",color:"var(--text-muted)",marginTop:"2px",fontFamily:"var(--font)"}}>{s.sub}</div>
                    <div className="stat-bar" style={{marginTop:"10px"}}><div className="stat-bar-fill" style={{width:`${s.p}%`}}></div></div>
                    {s.filter && <div className="stat-card-hint">Click to filter prospects →</div>}
                  </div>
                ))}
              </div>

              <div className="pipeline-insight">
                <strong>Priority read:</strong> {regionBreakdown[0]?.[0]} leads with {regionBreakdown[0]?.[1].A} HOT prospects.{" "}
                {topDistricts.filter(([,d])=>d.hotCount>0)[0] && (
                  <span><strong>{topDistricts.filter(([,d])=>d.hotCount>0)[0][0]}</strong> is your highest-opportunity district with {topDistricts.filter(([,d])=>d.hotCount>0)[0][1].hotCount} HOT school{topDistricts.filter(([,d])=>d.hotCount>0)[0][1].hotCount !== 1 ? "s" : ""} — charters buy direct, no committee.</span>
                )}{" "}
                <button className="btn btn-green" style={{padding:"6px 14px",fontSize:"12px",marginLeft:"8px"}} onClick={() => { setScoreFilter("A"); setTab("prospects"); }}>
                  Show all HOT prospects →
                </button>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
                <div className="panel-card">
                  <div className="panel-card-header" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div className="panel-card-title">By Region</div>
                    <div style={{fontSize:"11px",color:"var(--text-muted)"}}>Click to filter →</div>
                  </div>
                  <div className="panel-card-body">
                    <div className="region-breakdown">
                      {regionBreakdown.map(([region, data]) => (
                        <div key={region} className="region-row" onClick={() => { setRegionFilter(region); setDistrictFilter("ALL"); setTab("prospects"); showToast(region); }}>
                          <div className="region-name">{region}</div>
                          <div className="region-score-pills">
                            {data.signed > 0 && <span className="score-pill S">✓{data.signed}</span>}
                            {data.A > 0 && <span className="score-pill A">🔥{data.A}</span>}
                            {data.B > 0 && <span className="score-pill B">✅{data.B}</span>}
                          </div>
                          <div className="region-counts">{data.total}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="panel-card">
                  <div className="panel-card-header" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div className="panel-card-title">Top Districts by HOT Count</div>
                    <div style={{fontSize:"11px",color:"var(--text-muted)"}}>Click to filter →</div>
                  </div>
                  <div className="panel-card-body">
                    {topDistricts.map(([d, data]) => (
                      <div className="district-row" key={d} onClick={() => { setDistrictFilter(d); setRegionFilter("ALL"); setTab("prospects"); showToast(d); }}>
                        <div className="district-name" style={{fontSize:"12px"}}>{d}</div>
                        {data.hotCount > 0 && <span className="score-pill A">🔥{data.hotCount}</span>}
                        <div className="district-count">{data.count} schools</div>
                        <div className="district-bar-wrap">
                          <div className="district-bar" style={{width:`${Math.round(data.count/Math.max(...Object.values(distMap).map(x=>x.count))*100)}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="panel-card">
                <div className="panel-card-header" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div className="panel-card-title">Use Case Coverage</div>
                  <div style={{fontSize:"11px",color:"var(--text-muted)"}}>Click to filter →</div>
                </div>
                <div className="panel-card-body">
                  <div className="use-stat-grid">
                    {[["🎵","Music","music"],["🎙️","Podcast/Media","media"],["🔬","STEM","stem"],["📖","ELA/Literacy","ela"],["♿","Sped/SEL","sped"]].map(([icon,label,key]) => {
                      const count = SCHOOLS.filter(s=>s[key]).length;
                      return (
                        <div key={label} className="use-stat" onClick={() => { setUseFilter(key); setTab("prospects"); showToast(label); }} style={{cursor:"pointer"}}>
                          <div className="use-stat-icon">{icon}</div>
                          <div className="use-stat-num">{count}</div>
                          <div className="use-stat-label">{label}</div>
                          <div className="stat-bar" style={{marginTop:"8px"}}><div className="stat-bar-fill" style={{width:`${Math.round(count/SCHOOLS.length*100)}%`}}></div></div>
                          <div style={{fontSize:"10px",color:"var(--text-muted)",marginTop:"5px"}}>Tap to filter →</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="panel-card">
                <div className="panel-card-header">
                  <div className="panel-card-title">Cherry Creek SD — Social Proof Scripts</div>
                </div>
                <div className="panel-card-body">
                  {[
                    ["Opening line","Cherry Creek School District — one of Colorado's top and largest districts — is actively using Soundtrap for Education across their campuses for Music, STEM, ELA, and Special Education."],
                    ["97% stat","In a 2025 survey of 35 teachers and 6,416 students across 33 districts, 97% reported a positive impact on student learning outcomes."],
                    ["Student voice","Students who struggle with traditional writing consistently thrive when given the opportunity to create through audio. That's what Soundtrap was built for."],
                    ["Budget reframe","At roughly $20 per seat per year, a 100-student Classroom plan is around $2,000 annually — less than one substitute teacher day per semester."],
                  ].map(([tag,text]) => (
                    <div className="script-card" key={tag}>
                      <div className="script-tag">{tag}</div>
                      <div className="script-text">{text}</div>
                      <div style={{display:"flex",gap:"8px",marginTop:"10px",flexWrap:"wrap"}}>
                        <button className="btn btn-ghost" style={{fontSize:"11px"}} onClick={() => navigator.clipboard.writeText(text).then(() => showToast("Copied!"))}>📋 Copy</button>
                        <button className="btn btn-outline" style={{fontSize:"11px"}} onClick={() => { setEmailContext(p => p ? p+"\n\n"+text : text); setTab("email"); showToast("Added to Email Builder"); }}>✉️ Send to Email</button>
                        <button className="btn btn-outline" style={{fontSize:"11px"}} onClick={() => { setChatPasteContext(p => p ? p+"\n\n"+text : text); setChatPasteVisible(true); setTab("chat"); showToast("Added to PITCH AI"); }}>🤖 Send to Chat</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel-card">
                <div className="panel-card-header">
                  <div className="panel-card-title">Scoring Methodology — Data Sources</div>
                </div>
                <div className="panel-card-body">
                  <div style={{fontSize:"13px",color:"var(--text-dim)",lineHeight:"1.8",marginBottom:"14px"}}>Every score is from verifiable public data. No invented revenue projections or seat counts.</div>
                  {[
                    ["Purchase Authority (+3 or +4 pts)","Charter / CSI schools buy directly — no procurement committee. This is the single biggest fast-close predictor. Named STEM, Arts, or IB schools add +1 for curriculum mandate."],
                    ["Budget Headroom (+1 or +2 pts)","CDE per-pupil spending, 2023-24 actuals (cosfp.org). State avg = $10,614/yr. At/above avg = +1. Above $13k (Aspen $13,878, Telluride ~$18k) = +2."],
                    ["Program Fit (+1 or +2 pts)","Publicly observable: music program, journalism/broadcast, STEM designation, ELA, SpEd. 3+ use cases = +2. 2 = +1."],
                    ["Cherry Creek Proximity (+1 pt)","Schools in or adjacent to Cherry Creek SD earn +1 — peer proof point applies immediately."],
                    ["FRL % (+1 or -1 pt)","NCES/CDE data. Under 20% = +1 (affluent). Over 60% = -1 (lead with free trial + equity angle)."],
                    ["Thresholds","A (HOT) = 6+ pts. B (WARM) = 4-5 pts. C (MODERATE) = 0-3 pts."],
                  ].map(([title,body]) => (
                    <div key={title} style={{marginBottom:"12px",paddingBottom:"12px",borderBottom:"1px solid var(--border)"}}>
                      <div style={{fontSize:"11px",fontWeight:"600",color:"var(--green)",marginBottom:"4px",fontFamily:"var(--mono)",textTransform:"uppercase",letterSpacing:"0.05em"}}>{title}</div>
                      <div style={{fontSize:"13px",color:"var(--text-dim)",lineHeight:"1.65"}}>{body}</div>
                    </div>
                  ))}
                  <div style={{fontSize:"11px",color:"var(--text-muted)"}}>Sources: cosfp.org · CDE SchoolView · NCES Common Core of Data.</div>
                </div>
              </div>

            </div>
          )}


        </div>
      </div>

      {toast && (
        <div className="toast">
          <span className="toast-icon">✓</span>
          {toast}
        </div>
      )}
    </>
  );
}
