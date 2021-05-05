import 'dart:math';
import 'dart:ui';

import 'package:csv/csv.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:responsive_grid/responsive_grid.dart';

import 'sticky_note.dart';

class Home extends StatelessWidget {
  @override
  Widget container(BuildContext context, String data) {
    Random random = new Random();
    int index = random.nextInt(angles.length);
    int colorindex = random.nextInt(colors.length);
    return Container(
        // color: Colors.white,
        child: Center(
            child: SizedBox(
                width: 200,
                height: 250,
                child: Container(
                    // color: Colors.white,
                    child: Padding(
                  padding: EdgeInsets.only(top: 10, bottom: 10, right: 10),
                  child: StickyNote(
                      child: DefaultTextStyle(
                          style: TextStyle(
                              fontFamily: 'Calligraffitti',
                              fontSize: 18,
                              fontWeight: FontWeight.w500,
                              fontFeatures: [FontFeature.randomize()]),
                          child: Text(
                            data.toString(),
                          )),
                      angle: angles[index],
                      color: colors[colorindex]),
                )))));
  }

  List<double> angles = [0.01, -0.03, -0.02, 0.02, 0.0, 0.03, 0.04];

  List<Color> colors = [
    Color.fromARGB(255, 238, 150, 5),
    Color.fromARGB(255, 244, 230, 110),
    Color.fromARGB(255, 172, 227, 234)
  ];

  Future<List<String>> getIdeas() async {
    http.Response response = await http.get(Uri.parse(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSJSxT8lSDbx7HOefmSVTOoVglQG2KR1Z0f0w6uc9vtN-T1CnO8ef-QlVgS6fxtTbdCe-ZC5lHNcLwq/pub?gid=0&single=true&output=csv'));

    List<List<dynamic>> rowsAsListOfValues =
        const CsvToListConverter().convert(response.body);
    List<String> titles = [];
    int i = 1;
    while (i > 0 && i < rowsAsListOfValues.length) {
      titles.add(rowsAsListOfValues[i][1]);
      i++;
    }
    return titles;
  }

  @override
  Widget build(BuildContext context) {
    // getIdeas();
    return Container(
        color: Color.fromARGB(255, 173, 135, 98),
        child: Padding(
            padding: EdgeInsets.only(top: 30),
            child: FutureBuilder(
                future: getIdeas(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.done) {
                    return ResponsiveGridList(
                        desiredItemWidth: 200,
                        minSpacing: 10,
                        children: snapshot.data.map<Widget>((value) {
                          debugPrint(value);
                          return container(context, value);
                        }).toList());
                  } else {
                    return Text("Loading");
                  }
                })));
  }
}
