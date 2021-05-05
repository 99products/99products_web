import 'dart:math';
import 'dart:ui';

import 'package:csv/csv.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:http/http.dart' as http;
import 'package:responsive_grid/responsive_grid.dart';
import 'package:url_launcher/url_launcher.dart';

import 'sticky_note.dart';

class Home extends StatelessWidget {
  var width, height;
  Future<List<Idea>> ideas;
  Home() {
    ideas = getIdeas();
  }

  @override
  Widget container(BuildContext context, String data) {
    Random random = new Random();
    int index =
        // 0;
        random.nextInt(angles.length);
    int colorindex =
        // 0;
        random.nextInt(colors.length);

    return Container(
        // color: Colors.white,
        child: Center(
            child: SizedBox(
                width: 150,
                height: 150,
                child: Container(
                    // color: Colors.white,
                    child: Padding(
                  padding: EdgeInsets.only(top: 10),
                  child: StickyNote(
                      child: MouseRegion(
                        cursor: SystemMouseCursors.click,
                        child: centerText(data, 12),
                      ),
                      angle: angles[index],
                      color: colors[colorindex]),
                )))));
  }

  List<double> angles = [0.01, -0.03, -0.02, 0.02, 0.0, 0.03, 0.04];

  List<Color> colors = [
    // Color.fromARGB(255, 255, 126, 185),
    // Color.fromARGB(255, 255, 101, 163),
    Color.fromARGB(255, 122, 252, 255),
    Color.fromARGB(255, 254, 255, 156),
    Color.fromARGB(255, 255, 247, 64),
  ];

  Future<List<Idea>> getIdeas() async {
    http.Response response = await http.get(Uri.parse(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSJSxT8lSDbx7HOefmSVTOoVglQG2KR1Z0f0w6uc9vtN-T1CnO8ef-QlVgS6fxtTbdCe-ZC5lHNcLwq/pub?gid=0&single=true&output=csv'));

    List<List<dynamic>> rowsAsListOfValues =
        const CsvToListConverter().convert(response.body);
    List<Idea> titles = [];
    int i = 1;
    while (i > 0 && i < rowsAsListOfValues.length) {
      titles.add(Idea(rowsAsListOfValues[i][1], rowsAsListOfValues[i][9]));
      i++;
    }
    return titles;
  }

  @override
  Widget build(BuildContext context) {
    width = MediaQuery.of(context).size.width;
    height = MediaQuery.of(context).size.height;
    return Container(
        color: Colors.green.shade300,
        child: Column(children: [
          SizedBox(
            height: 10,
          ),
          GestureDetector(
              onTap: () => {
                    _launchURL(
                        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSJSxT8lSDbx7HOefmSVTOoVglQG2KR1Z0f0w6uc9vtN-T1CnO8ef-QlVgS6fxtTbdCe-ZC5lHNcLwq/pub?gid=0&single=true')
                  },
              child: MouseRegion(
                child: centerText('99Products', 20),
                cursor: SystemMouseCursors.click,
              )),
          centerText('An idea can change everything', 10),
          SizedBox(
            height: 20,
          ),
          Expanded(child: responseGrid(context))
        ]));
  }

  Widget responseGrid(BuildContext context) {
    return FutureBuilder(
        future: ideas,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            return ResponsiveGridList(
                desiredItemWidth: width > height ? 150 : (width / 3) - 30,

                // minSpacing: 5,
                children: snapshot.data.map<Widget>((value) {
                  return GestureDetector(
                      onTap: () {
                        if (value.link != null &&
                            value.link.toString().trim().length > 0)
                          _launchURL(value.link);
                      },
                      child: container(context, value.title));
                }).toList());
          } else {
            return centerText("Loading..", 24);
          }
        });
  }

  Widget centerText(String text, double fontSize,
      {Color color: Colors.black54}) {
    return Center(
        child: DefaultTextStyle(
            textAlign: TextAlign.center,
            style: TextStyle(
                fontFamily: 'ComingSoon',
                fontSize: fontSize,
                color: color,
                fontWeight: FontWeight.bold,
                fontFeatures: [FontFeature.randomize()]),
            child: Text(text)));
  }

  void _launchURL(url) async {
    if (await canLaunch(url)) await launch(url);
  }
}

class Idea {
  String title;
  String link;
  Idea(this.title, this.link);
}
