package main

import (
	"flag"
	"fmt"
	"os"
	"time"

	"github.com/isucon/isucon14-portal/supervisor/dummybench/benchrun"
	isuxportalResources "github.com/isucon/isucon14-portal/supervisor/dummybench/gen/isuxportal/resources"
)

func main() {
	var err error

	interval := 0.0
	count := 6

	var target string = ""
	flag.StringVar(&target, "target", "", "target address")
	flag.IntVar(&count, "count", 6, "count")
	flag.Float64Var(&interval, "interval", 0.0, "interval")

	fmt.Printf("[stdout] Target: %v\n", benchrun.GetTargetAddress())
	fmt.Printf("[stdout] All: %v\n", benchrun.GetAllAddresses())
	fmt.Printf("[stdout] Target: %v\n", target)
	fmt.Fprintf(os.Stderr, "[stderr] Target: %v\n", benchrun.GetTargetAddress())
	fmt.Fprintf(os.Stderr, "[stderr] All: %v\n", benchrun.GetAllAddresses())
	fmt.Fprintf(os.Stderr, "[stderr] Target: %v\n", target)

	//for i := 1; i <= 1000; i++ {
	//	fmt.Printf("\xFE\xFF\xF0")
	//}
	//fmt.Printf("\xFE\xFF\xF0\n")

	r, err := benchrun.NewReporter(true)
	if err != nil {
		panic(err)
	}

	i := 0
	for {
		i++
		last := count > 0 && i == count

		var execution *isuxportalResources.BenchmarkResult_Execution
		if last {
			// Only "Reason" field is required, other fields are filled by supervisor
			execution = &isuxportalResources.BenchmarkResult_Execution{
				Reason: "fail",
			}
		}

		raw := int64(i)
		deduction := int64(0)
		if i%2 == 0 {
			deduction = int64(i)
		}

		rep := isuxportalResources.BenchmarkResult{
			// Finished field is not important; it is always overridden to false by supervisor while a benchmarker process alive.
			Finished: last,
			Passed:   (raw - deduction) > 0,
			Score:    raw - deduction,
			ScoreBreakdown: &isuxportalResources.BenchmarkResult_ScoreBreakdown{
				Raw:       raw,
				Deduction: deduction,
			},
			Execution: execution,
			SurveyResponse: &isuxportalResources.SurveyResponse{
				Language: "galaxy",
			},
		}

		err = r.Report(&rep)
		if err != nil {
			panic(err)
		}

		time.Sleep(time.Duration(interval) * time.Second)
		if last {
			break
		}
	}
}
